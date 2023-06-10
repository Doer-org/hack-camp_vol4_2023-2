module GraphQL.Schema.Query

open System
open FSharp.Data.GraphQL.Types
open FsToolkit.ErrorHandling

open Domain
open GraphQL.Schema.Types

module private QueryCommand =
    let getUser = "user"
    let getProfile = "profile"
    let getUserByToken = "userByToken"
    let getUsers = "allUsers"
    let getTimeline = "timeline"
    let getAllTimeline = "allTimeline"
    let getLastAccess: string = "lastAccess"

let private getUserByToken (token: Domain.Token option) (store: Store.IStore) =
    Define.Field(
        QueryCommand.getUserByToken,
        Nullable UserDataType,
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

let private getAllUsers (store: Store.IStore) =
    Define.Field(
        QueryCommand.getUsers,
        ListOf UserDataType,
        "get all users",
        fun _ _ ->
            let users = store.getAllUsers ()

            match users with
            | Error _ -> []
            | Ok users -> users
    )


let private getUser (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getUser,
        UserType,
        "get user",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let resp: Result<Response.User, string> =
                result {
                    let! userData =
                        store.getUser user_id
                        |> Result.bind (function
                            | None -> Error "no user"
                            | Some user -> Ok user)

                    let! userFollow = store.getFollowingUsers user_id
                    let! userFollower = store.getFollowers user_id
                    let! userLog = store.getLog user_id

                    return
                        { data = userData
                          follow = userFollow
                          follower = userFollower
                          user_log = userLog }
                }

            resp
            |> function
                | Error e -> failwith e
                | Ok r -> r
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

let private getLastAccess (isTest: bool) (token: Domain.Token option) (store: Store.IStore) =
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

let private getProfile (store: Store.IStore) =
    let args = {| user_id = "user_id" |}

    Define.Field(
        QueryCommand.getProfile,
        ProfileType,
        "get profile",
        [ Define.Input(args.user_id, String) ],
        fun ctx _ ->
            let user_id = ctx.Arg args.user_id

            let resp =
                result {
                    let! reaction = Domain.getReaction store.getReaction user_id
                    let! ramen = Domain.getRamenProfile store.getRamenProfile user_id
                    let! music = Domain.getFavoriteMusicProfile store.getFavoriteMusicProfile user_id
                    let! artist = Domain.getFavoriteArtistsProfile store.getFavoriteArtistsProfile user_id

                    return
                        { reactions = reaction
                          ramens = ramen
                          musics = music
                          artists = artist }

                }

            resp
            |> function
                | Error e -> failwith e
                | Ok logs -> logs
    )


let Query (isTest: bool) (token: Domain.Token option) (store: Store.IStore) =
    Define.Object<Root>(
        name = "Query",
        fields =
            [ getUserByToken token store
              getAllUsers store
              getTimeline isTest token store
              getLastAccess isTest token store
              getAllTimeline store
              getUser store
              getProfile store ]
    )
