namespace GraphQL

module Schema =
    open FSharp.Data.GraphQL
    open FSharp.Data.GraphQL.Types

    open Domain

    type Root = { RequestId: string }

    let rec private UserType =
        Define.Object<User>(
            name = "user",
            description = "user",
            isTypeOf = (fun o -> o :? User),
            fieldsFn =
                fun () ->
                    [ Define.Field("user_id", String, (fun _ user -> user.user_id))
                      Define.Field("user_name", String, (fun _ user -> user.user_name)) ]
        )

    and private RootType =
        Define.Object<Root>(
            name = "Root",
            description = "Root type passed to all resolvers.",
            isTypeOf = (fun o -> o :? Root),
            fieldsFn =
                fun () ->
                    [ Define.Field("requestId", String, "The ID of the client.", (fun _ (r: Root) -> r.RequestId)) ]
        )

    let private Query (store: Store.IStore) =
        Define.Object<Root>(
            name = "Query",
            fields =
                [ Define.Field(
                      "user",
                      Nullable UserType,
                      "get user",
                      [ Define.Input("user_id", String) ],
                      (fun ctx _ ->
                          let ret = store.getUser (ctx.Arg "user_id")

                          let user =
                              match ret with
                              | Ok user -> user
                              | Error e -> None

                          user)
                  )

                  Define.Field(
                      "users",
                      ListOf UserType,
                      "get all users",
                      fun _ _ ->
                          let users = store.getAllUsers ()

                          match users with
                          | Error e -> []
                          | Ok users -> users
                  ) ]
        )

    let private schemaConfig =
        { SchemaConfig.Default with
            Types = [ UserType ] }

    let private Mutation (store: Store.IStore) =
        Define.Object<Root>(
            name = "Mutation",
            fields =
                [ Define.Field(
                      "createUser",
                      Nullable UserType,
                      "create user",
                      [ Define.Input("user_name", String) ],
                      fun ctx _ ->
                          let user =
                              { user_id = System.Guid.NewGuid() |> string
                                user_name = ctx.Arg "user_name" }

                          let ret = store.createUser user

                          match ret with
                          | Error e -> None
                          | Ok user -> Some user
                  ) ]
        )

    let private schema (store: Store.IStore) : ISchema<Root> =
        upcast Schema(Query store, Mutation store, config = schemaConfig)

    let executor (store: Store.IStore) = Executor(schema store)
