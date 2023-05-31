module GraphQL.Handler

open FSharp.Data.GraphQL
open FSharp.Data.GraphQL.Execution
open Newtonsoft.Json
open Newtonsoft.Json.Linq

open GraphQL

let private serialize =
    let settings = JsonSerializerSettings()
    settings.ContractResolver <- Serialization.CamelCasePropertyNamesContractResolver()
    fun o -> JsonConvert.SerializeObject(o, settings)

let private deserialize (data: string) =
    let getMap (token: JToken) =
        let rec mapper (name: string) (token: JToken) =
            match name, token.Type with
            | "variables", JTokenType.Object ->
                token.Children<JProperty>()
                |> Seq.map (fun x -> x.Name, mapper x.Name x.Value)
                |> Map.ofSeq
                |> box
            | name, JTokenType.Array -> token |> Seq.map (fun x -> mapper name x) |> Array.ofSeq |> box
            | _ -> (token :?> JValue).Value

        token.Children<JProperty>()
        |> Seq.map (fun x -> x.Name, mapper x.Name x.Value)
        |> Map.ofSeq

    if System.String.IsNullOrWhiteSpace(data) then
        None
    else
        data |> JToken.Parse |> getMap |> Some


let private json =
    function
    | Direct(data, _) -> serialize data
    | Deferred(data, _, deferred) ->
        deferred |> Observable.add (fun d -> printfn "Deferred: %s" (serialize d))
        serialize data
    | Stream data ->
        data |> Observable.add (fun d -> printfn "Subscription data: %s" (serialize d))
        "{}"

let private removeWhitespacesAndLineBreaks (str: string) = str.Trim().Replace("\r\n", " ")

let private handleGraphQLQuery (sub: Domain.sub option) (store: Store.IStore) (body: string) =
    task {
        let data = body |> deserialize

        let query =
            data
            |> Option.bind (fun data ->
                if not <| data.ContainsKey "query" then
                    None
                else
                    match data.["query"] with
                    | :? string as x -> removeWhitespacesAndLineBreaks x |> Some
                    | _ -> failwith "failed to parse query.")

        let variables =
            data
            |> Option.bind (fun data ->
                if not <| data.ContainsKey "variables" then
                    None
                else
                    match data.["variables"] with
                    | null -> None
                    | :? string as x -> deserialize x
                    | :? Map<string, obj> as x -> Some x
                    | _ -> failwith "failed to parse variables.")

        let executor = Util.executor sub store
        let root: Schema.Types.Root = { RequestId = System.Guid.NewGuid() |> string }

        let! resp =
            match query with
            | None -> executor.AsyncExecute(Introspection.IntrospectionQuery)
            | Some query ->
                match variables with
                | None -> executor.AsyncExecute(query, root)
                | Some variables -> executor.AsyncExecute(query, root, variables)

        return json resp

    }

open Falco

open System
open System.Security.Cryptography
open JWT
open JWT.Algorithms
open JWT.Builder
open JWT.Serializers

let handleGraphQL (AUTH0_JWKS: string, AUTH0_DOMAIN: string, AUTH0_AUDIENCE: string) : HttpHandler =

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
            AUTH0_JWKS
            |> serializer.Deserialize<{| keys: {| kid: string; x5c: string[] |}[] |}>

        let kid2cert = jwksJson.keys |> Seq.map (fun key -> key.kid, key.x5c[0]) |> dict

        fun kid ->
            kid2cert.TryGetValue kid
            |> function
                | false, _ -> Error "invalid kid"
                | true, cert ->
                    cert
                    |> Convert.FromBase64String
                    |> fun cert -> new X509Certificates.X509Certificate2(rawData = cert)
                    |> Ok

    let jwtDecoder (kid: string) =
        publicKeys kid
        |> Result.map (fun certificate ->
            let algorithm = new RS256Algorithm(cert = certificate)
            let urlEncoder = new JwtBase64UrlEncoder()
            JwtDecoder(serializer, jwtValidator, urlEncoder, algorithm))

    fun ctx ->

        let baseHandler (sub: Domain.sub option) (store: Store.IStore) : HttpHandler =
            fun ctx ->
                task {
                    let! body = Request.getBodyString ctx
                    let! resp = handleGraphQLQuery sub store body
                    return Response.ofPlainText $"{resp}" ctx
                }

        task {
            let store = ctx.GetService<Store.IStore>()
            let cookie = Request.getCookie ctx
            let accessToken = cookie.Get("accessToken")

            let tokenPayload =
                try
                    let accessTokenHeader = jwtHeaderDecoder accessToken
                    let decorder = jwtDecoder (accessTokenHeader.KeyId)
                    decorder |> Result.map (fun decorder -> decorder.Decode(accessToken))
                with
                | :? Exceptions.InvalidTokenPartsException as e -> Error e.Message
                | :? ArgumentOutOfRangeException as e -> Error e.Message
                | :? ArgumentException as e -> Error e.Message
                | e -> Error e.Message

            let handler: HttpHandler =
                match tokenPayload with
                | Error _ -> baseHandler None store
                | Ok tokenPayload ->
                    let payload =
                        tokenPayload
                        |> serializer.Deserialize<{| iss: string
                                                     aud: string[]
                                                     sub: string |}>

                    let issIsCorrect = $@"https://{AUTH0_DOMAIN}/" = payload.iss

                    let audIsCorrect =
                        let tokenAudience = payload.aud |> Set.ofArray
                        tokenAudience.Contains AUTH0_AUDIENCE

                    if issIsCorrect && audIsCorrect then
                        baseHandler (Some payload.sub) store
                    else
                        baseHandler None store

            return handler ctx
        }
