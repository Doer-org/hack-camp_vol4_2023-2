module GraphQL.Schema.Query

open System
open GraphQL.Schema.Types
open FSharp.Data.GraphQL.Types

open Domain

module private QueryCommand =
    let getUser = "user"
    let getUsers = "getUsers"
    let getFollows = "getFollows"
    let getFollowers = "getFollowers"
    let getProfile = "getProfile"
    let getTimeline = "getTimeline"
    let getAllTimeline = "getAllTimeline"
    let getReaction = "getReaction"
    let getBookmarkUsers = "getBookmarkUsers"
    let getRamenProfile = "getRamenProfile"


let private accountValidation store = fun _ -> true
// Utils.accountValidation store

let private getUser (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getUser,
        Nullable UserType,
        "get user",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let ret = store.getUser (ctx.Arg args.user_id)

            match ret with
            | Error e -> failwith e
            | Ok user -> user
    )

let private getAllUsers (store: Store.IStore) =
    Define.Field(
        QueryCommand.getUsers,
        ListOf UserType,
        "get all users",
        fun _ _ ->
            let users = store.getAllUsers ()

            match users with
            | Error _ -> []
            | Ok users -> users
    )

let private getFollows (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getFollows,
        ListOf UserType,
        "get follows",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id_from = ctx.Arg args.user_id

            let result = Domain.getFollowingUsers store.getFollowingUsers user_id_from

            result
            |> function
                | Error e -> failwith e
                | Ok follows -> follows
    )

let private getFollowers (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getFollowers,
        ListOf UserType,
        "get followers",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id_to = ctx.Arg args.user_id

            let result = Domain.getFollowers store.getFollowers user_id_to

            result
            |> function
                | Error e -> failwith e
                | Ok followers -> followers
    )

let private getTimeline (sub: Domain.sub option) (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getTimeline,
        ListOf ProfileChangeLogType,
        "get following users timeline",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let sub =
                sub
                |> function
                    | None -> null // failwith "no sub"
                    | Some sub -> sub

            let account: User.Account = { sub = sub; user_id = user_id }

            let result =
                Domain.getFollowingUsersTimeline
                    store.getTimeline
                    account
                    (accountValidation store)
                    DateTimeOffset.Now
                    (fun _ _ _ -> Error "未実装")

            result
            |> function
                | Error e -> failwith e
                | Ok logs -> logs
    )

let private getAllTimeline (sub: Domain.sub option) (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getAllTimeline,
        ListOf ProfileChangeLogType,
        "get all users timeline",
        fun ctx _ ->
            let query = Domain.getAllTimeline store.getAllTimeline

            query ()
            |> function
                | Error e -> failwith e
                | Ok logs -> logs |> Seq.toList
    )

let private getReaction (sub: Domain.sub option) (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getReaction,
        ListOf ProfileReactionType,
        "get reaction",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let sub =
                sub
                |> function
                    | None -> null // failwith "no sub"
                    | Some sub -> sub

            let account: User.Account = { sub = sub; user_id = user_id }

            let result = Domain.getReaction store.getReaction account (accountValidation store)

            result
            |> function
                | Error e -> failwith e
                | Ok reactions -> reactions
    )

let rec getProfile (sub: Domain.sub option) (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getProfile,
        Nullable ProfileType,
        "get profile",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let sub =
                sub
                |> function
                    | None -> null // failwith "no sub"
                    | Some sub -> sub

            let account: User.Account = { sub = sub; user_id = user_id }

            let result = Domain.getProfile store.getProfile account (accountValidation store)

            result
            |> function
                | Error e -> failwith e
                | Ok profile -> Some profile
    )

let rec getRamenProfile (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getRamenProfile,
        ListOf ProfileRamenFavoriteRamenyaType,
        "get ramen profile",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let result = Domain.getRamenProfile store.getRamenProfile user_id

            result
            |> function
                | Error e -> failwith e
                | Ok profile -> profile
    )


let Query (sub: Domain.sub option) (store: Store.IStore) =
    Define.Object<Root>(
        name = "Query",
        fields =
            [ getUser store
              getAllUsers store
              getFollows store
              getFollowers store
              getTimeline sub store
              getReaction sub store
              getAllTimeline sub store


              //Define.Field(
              //    "getBookmarkUsers",
              //    ListOf UserType,
              //    "get bookmark user",
              //    [ Define.Input("user_id", String) ],
              //    fun ctx _ ->
              //        let user_id = ctx.Arg "user_id"
              //        let result =
              //            Domain.getBookmarkUsers store.getBookmarkUsers user_id (accountValidation store)
              //        result
              //        |> function
              //            | Error _ -> []
              //            | Ok users -> users
              //)
              getProfile sub store

              getRamenProfile store ]
    )
