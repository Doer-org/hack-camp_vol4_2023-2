module GraphQL.Schema.Query

open System
open GraphQL.Schema.Types
open FSharp.Data.GraphQL.Types

open Domain

module private QueryCommand =
    let getUserByToken = "getUserByToken"
    let getUser = "user"
    let getUsers = "getUsers"
    let getFollows = "getFollows"
    let getFollowers = "getFollowers"
    let getProfile = "getProfile"
    let getTimeline = "getTimeline"
    let getAllTimeline = "getAllTimeline"
    let getReaction = "getReaction"
    let getRamenProfile = "getRamenProfile"
    let getFavoriteMusic = "getFavoriteMusic"
    let getFavoriteArtist = "getFavoriteArtist"
    let getLastAccess: string = "getLastAccess"

let private getUserByToken (token: Domain.Token option) (store: Store.IStore) =
    Define.Field(
        QueryCommand.getUserByToken,
        Nullable UserType,
        "getUserByToken",
        fun _ _ ->
            let sub =
                token
                |> function
                    | None -> failwith "no sub"
                    | Some token -> token.sub

            let account =
                store.getAccountBySub sub
                |> function
                    | Error e -> failwith e
                    | Ok account -> account

            let ret = store.getUser account.user_id

            match ret with
            | Error e -> failwith e
            | Ok user -> user
    )

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

            user_id_from
            |> Domain.getFollowingUsers store.getFollowingUsers
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

let private getTimeline (isTest: bool) (token: Domain.Token option) (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getTimeline,
        ListOf ProfileChangeLogType,
        "get following users timeline",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let sub =
                token
                |> function
                    | None -> if isTest then null else failwith "no sub"
                    | Some token -> token.sub

            let account: User.Account = { sub = sub; user_id = user_id }

            let result =
                Domain.getFollowingUsersTimeline
                    store.getTimeline
                    account
                    (Utils.accountValidation isTest store)
                    DateTimeOffset.Now
                    (fun account validate log ->
                        let logResult = Domain.updateUserLog store.updateLog account validate log

                        logResult
                        |> function
                            | Error e -> printfn "%A" e
                            | Ok _ -> ()

                        logResult

                    )

            result
            |> function
                | Error e -> failwith e
                | Ok logs -> logs
    )

let private getAllTimeline (store: Store.IStore) =
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

let private getReaction (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getReaction,
        ListOf ProfileReactionType,
        "get reaction",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id_to: UserID = ctx.Arg args.user_id

            let query = Domain.getReaction store.getReaction

            user_id_to
            |> query
            |> function
                | Error e -> failwith e
                | Ok reactions -> reactions
    )

// let rec getProfile (isTest: bool) (token: Domain.Token option) (store: Store.IStore) =
//     let args = {| user_id = "user_id" |}

//     Define.Field(
//         QueryCommand.getProfile,
//         Nullable ProfileType,
//         "get profile",
//         [ Define.Input(args.user_id, String) ],
//         fun ctx _ ->
//             let user_id = ctx.Arg args.user_id

//             let sub =
//                 token
//                 |> function
//                     | None -> if isTest then null else failwith "no sub"
//                     | Some(token: Token) -> token.sub

//             let account: User.Account = { sub = sub; user_id = user_id }

//             let result =
//                 Domain.getProfile store.getProfile account (Utils.accountValidation isTest store)

//             result
//             |> function
//                 | Error e -> failwith e
//                 | Ok profile -> Some profile
//     )

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

let rec getFavoriteMusicProfile (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getFavoriteMusic,
        ListOf ProfileMusicFavoriteMusicType,
        "get favorite music",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let result = Domain.getFavoriteMusicProfile store.getFavoriteMusicProfile user_id

            result
            |> function
                | Error e -> failwith e
                | Ok profile -> profile
    )

let rec getFavoriteArtistsProfile (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getFavoriteArtist,
        ListOf ProfileMusicFavoriteArtistType,
        "get favorite artists",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let result =
                Domain.getFavoriteArtistsProfile store.getFavoriteArtistsProfile user_id

            result
            |> function
                | Error e -> failwith e
                | Ok profile -> profile
    )

let getLastAccess (isTest: bool) (token: Domain.Token option) (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getLastAccess,
        Nullable UserLogType,
        "get last access",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let sub =
                token
                |> function
                    | None -> if isTest then null else failwith "no sub"
                    | Some token -> token.sub

            let account: User.Account = { sub = sub; user_id = user_id }

            let result =
                Domain.getLog store.getLog account (Utils.accountValidation isTest store)

            result
            |> function
                | Error e -> failwith e
                | Ok log -> log

    )


let Query (isTest: bool) (token: Domain.Token option) (store: Store.IStore) =
    Define.Object<Root>(
        name = "Query",
        fields =
            [ getUserByToken token store
              getUser store
              getAllUsers store
              getFollows store
              getFollowers store
              getTimeline isTest token store
              getLastAccess isTest token store
              getReaction store
              getAllTimeline store
              //   getProfile isTest token store
              getRamenProfile store
              getFavoriteMusicProfile store
              getFavoriteArtistsProfile store ]
    )
