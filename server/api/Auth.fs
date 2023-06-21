module Auth

open System
open System.Security.Cryptography
open JWT
open JWT.Algorithms
open JWT.Builder
open JWT.Serializers
open Falco

type Permission =
    | ReadResource
    | CreateResource
    | UpdateResource
    | DaleteResource

module Permission =
    let string =
        function
        | ReadResource -> "read:resource"
        | CreateResource -> "create:resource"
        | UpdateResource -> "update:resource"
        | DaleteResource -> "delete:resource"

    let private permissionDict =
        [ CreateResource; ReadResource; UpdateResource; DaleteResource ]
        |> List.map (fun per -> string per, per)
        |> dict

    let map v =
        permissionDict.TryGetValue v
        |> function
            | true, v -> Some v
            | _ -> None

let validate
    (auth0_jwks: string, auth0_domain: string, auth0_audience: string)
    (permissions: Permission list)
    (handleInvalid: HttpHandler)
    (handleValid: HttpHandler)
    : HttpHandler =
    let jwtHeaderDecoder = JwtBuilder.Create().DecodeHeader<JwtHeader>

    let serializer = new JsonNetSerializer()

    let jwtValidator =
        let validationParams =
            let v = ValidationParameters.Default
            v.ValidateSignature <- true
            v.ValidateExpirationTime <- true
            v.ValidateIssuedTime <- true
            v.TimeMargin <- 100
            v

        let dateTimeProvider = UtcDateTimeProvider()
        JwtValidator(serializer, dateTimeProvider, validationParams)

    let publicKeys =
        let jwksJson =
            auth0_jwks
            |> serializer.Deserialize<{| keys:
                                             {| kid: string; x5c: string[] |}[] |}>

        let kid2cert =
            jwksJson.keys |> Seq.map (fun key -> key.kid, key.x5c[0]) |> dict

        fun kid ->
            kid2cert.TryGetValue kid
            |> function
                | false, _ -> Error "invalid kid"
                | true, cert ->
                    cert
                    |> Convert.FromBase64String
                    |> fun cert ->
                        new X509Certificates.X509Certificate2(rawData = cert)
                    |> Ok

    let jwtDecoder (kid: string) =
        publicKeys kid
        |> Result.map (fun certificate ->
            let algorithm = new RS256Algorithm(cert = certificate)
            let urlEncoder = new JwtBase64UrlEncoder()
            JwtDecoder(serializer, jwtValidator, urlEncoder, algorithm))

    fun ctx ->
        task {
            let cookie = Request.getCookie ctx
            let accessToken = cookie.Get("accessToken")

            let tokenPayload =
                try
                    let accessTokenHeader = jwtHeaderDecoder accessToken
                    let decorder = jwtDecoder (accessTokenHeader.KeyId)

                    decorder
                    |> Result.map (fun decorder -> decorder.Decode(accessToken))
                with
                | :? Exceptions.InvalidTokenPartsException as e ->
                    Error e.Message
                | :? ArgumentOutOfRangeException as e -> Error e.Message
                | :? ArgumentException as e -> Error e.Message
                | e -> Error e.Message

            let handler =
                match tokenPayload with
                | Error _ -> handleInvalid
                | Ok tokenPayload ->
                    let payload =
                        tokenPayload
                        |> serializer.Deserialize<{| iss: string
                                                     aud: string[]
                                                     permissions: string[] |}>

                    let hasAllRequiredPermissions =
                        let tokenPermissions =
                            payload.permissions
                            |> Set.ofArray
                            |> Set.map Permission.map
                            |> Set.filter Option.isSome
                            |> Set.map Option.get

                        permissions |> List.forall tokenPermissions.Contains

                    let issIsCorrect = $@"https://{auth0_domain}/" = payload.iss

                    let audIsCorrect =
                        let tokenAudience = payload.aud |> Set.ofArray
                        tokenAudience.Contains auth0_audience

                    if
                        issIsCorrect
                        && audIsCorrect
                        && hasAllRequiredPermissions
                    then
                        handleValid
                    else
                        handleInvalid

            return handler ctx
        }
