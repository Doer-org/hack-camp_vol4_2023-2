module GraphQL.Handler

open FSharp.Data.GraphQL
open FSharp.Data.GraphQL.Execution
open Newtonsoft.Json
open Newtonsoft.Json.Linq

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

let private handleGraphQLQuery (store: Store.IStore) (body: string) =
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

        let executor = Schema.executor store
        let root: Schema.Root = { RequestId = System.Guid.NewGuid() |> string }

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

let handleGraphQL: HttpHandler =
    fun ctx ->
        let store = ctx.GetService<Store.IStore>()

        task {
            let! body = Request.getBodyString ctx
            let! resp = handleGraphQLQuery store body
            return Response.ofPlainText $"{resp}" ctx
        }
