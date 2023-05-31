module GraphQL.Schema.Query

open System
open GraphQL.Schema.Types
open FSharp.Data.GraphQL.Types

open Domain

let Query (sub: Domain.sub option) (store: Store.IStore) =
    Define.Object<Root>(
        name = "Query",
        fields =
            [ Define.Field(
                  "user",
                  Nullable UserType,
                  "get user",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let ret = store.getUser (ctx.Arg "user_id")

                      match ret with
                      | Error _ -> None
                      | Ok user -> user
              )

              Define.Field(
                  "users",
                  ListOf UserType,
                  "get all users",
                  fun _ _ ->
                      let users = store.getAllUsers ()

                      match users with
                      | Error _ -> []
                      | Ok users -> users
              )

              Define.Field(
                  "getFollows",
                  ListOf UserType,
                  "get follows",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let user_id_from = ctx.Arg "user_id_from"

                      let result = Domain.getFollowingUsers store.getFollowingUsers user_id_from

                      result
                      |> function
                          | Error _ -> []
                          | Ok follows -> follows
              )

              Define.Field(
                  "getFollowers",
                  ListOf UserType,
                  "get followers",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let user_id_to = ctx.Arg "user_id_to"

                      let result = Domain.getFollowers store.getFollowers user_id_to

                      result
                      |> function
                          | Error _ -> []
                          | Ok followers -> followers
              )

              Define.Field(
                  "getTimeline",
                  ListOf ProfileChangeLogType,
                  "get following users timeline",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let user_id = ctx.Arg "user_id"

                      match sub with
                      | None -> []
                      | Some sub ->
                          let account: User.Account = { sub = sub; user_id = user_id }

                          let result =
                              Domain.getFollowingUsersTimeline
                                  store.getTimeline
                                  account
                                  (store.getAccount >> Result.isOk)
                                  DateTimeOffset.Now
                                  (fun _ _ _ -> Error "未実装")

                          result
                          |> function
                              | Error _ -> []
                              | Ok logs -> logs

              )

              Define.Field(
                  "getAllTimeline",
                  ListOf ProfileChangeLogType,
                  "get all users timeline",
                  fun ctx _ ->
                      let query = Domain.getAllTimeline store.getAllTimeline

                      query ()
                      |> function
                          | Error _ -> []
                          | Ok logs -> logs |> Seq.toList
              )

              Define.Field(
                  "getReaction",
                  ListOf ProfileReactionType,
                  "get reaction",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let user_id = ctx.Arg "user_id"

                      let result =
                          Domain.getReaction store.getReaction user_id (store.getAccount >> Result.isOk)

                      result
                      |> function
                          | Error _ -> []
                          | Ok reactions -> reactions
              )

              Define.Field(
                  "getBookmarkUsers",
                  ListOf UserType,
                  "get bookmark user",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let user_id = ctx.Arg "user_id"

                      let result =
                          Domain.getBookmarkUsers store.getBookmarkUsers user_id (store.getAccount >> Result.isOk)

                      result
                      |> function
                          | Error _ -> []
                          | Ok users -> users
              )

              Define.Field(
                  "getProfile",
                  Nullable ProfileType,
                  "get profile",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let user_id = ctx.Arg "user_id"

                      let result =
                          Domain.getProfile store.getProfile user_id (store.getAccount >> Result.isOk)

                      result
                      |> function
                          | Error _ -> None
                          | Ok profile -> Some profile
              )

              Define.Field(
                  "getRamenProfile",
                  ListOf ProfileRamenFavoriteRamenyaType,
                  "get ramen profile",
                  [ Define.Input("user_id", String) ],
                  fun ctx _ ->
                      let user_id = ctx.Arg "user_id"

                      let result = Domain.getRamenProfile store.getRamenProfile user_id

                      result
                      |> function
                          | Error _ -> []
                          | Ok profile -> profile
              ) ]
    )
