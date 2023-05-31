module GraphQL.Schema.Mutation

open System
open FSharp.Data.GraphQL.Types

open GraphQL.Schema.Types
open Domain

let Mutation (sub: Domain.sub option) (store: Store.IStore) =
    Define.Object<Root>(
        name = "Mutation",
        fields =
            [ Define.Field(
                  "createUser",
                  Nullable UserType,
                  "create user",
                  [ Define.Input("user_name", String) ],
                  fun ctx _ ->
                      sub
                      |> Option.bind (fun sub ->
                          let user: User =
                              { user_id = System.Guid.NewGuid() |> string
                                user_name = ctx.Arg "user_name"
                                image_url = "" }

                          user
                          |> Domain.createUser
                              (store.getAccountBySub >> Result.isOk)
                              (store.createAccount)
                              (store.createUser)
                              sub
                          |> function
                              | Error _ -> None
                              | Ok user -> Some user)
              )

              Define.Field(
                  "updateFollow",
                  Nullable UserFollowType,
                  "update follow",
                  [ Define.Input("user_id_from", String)
                    Define.Input("user_id_to", String)
                    Define.Input("is_follow", Boolean) ],
                  fun ctx _ ->
                      sub
                      |> Option.bind (fun sub ->
                          let isFollow = ctx.Arg "is_follow"

                          let follow: User.Follow =
                              { user_id_from = ctx.Arg "user_id_from"
                                user_id_to = ctx.Arg "user_id_to" }

                          let account: User.Account =
                              { sub = sub
                                user_id = follow.user_id_from }

                          let updateFollow =
                              Domain.updateFollowUser
                                  (store.followUser)
                                  (store.unfollowUser)
                                  account
                                  (store.getAccount >> Result.isOk)
                                  {| isFollow = isFollow
                                     follow = follow |}

                          updateFollow
                          |> function
                              | Error _ -> None
                              | Ok user -> Some user)
              )

              Define.Field(
                  "updateReaction",
                  Nullable ProfileReactionType,
                  "update reaction",
                  [ Define.Input("user_id_from", String)
                    Define.Input("user_id_to", String)
                    Define.Input("kind", String) ],
                  fun ctx _ ->
                      sub
                      |> Option.bind (fun sub ->

                          let reaction: Profile.Reaction =
                              { user_id_from = ctx.Arg "user_id_from"
                                user_id_to = ctx.Arg "user_id_to"
                                kind = ctx.Arg "kind"
                                timestamp = DateTimeOffset.Now }

                          let changeLog: Profile.ChangeLog =
                              { user_id = reaction.user_id_from
                                summary = "reaction!!!" + string DateTimeOffset.Now
                                timestamp = DateTimeOffset.Now }

                          let account: User.Account =
                              { sub = sub
                                user_id = reaction.user_id_from }

                          let result =
                              Domain.updateReaction
                                  (store.updateReaction)
                                  (fun _ -> ())
                                  account
                                  (store.getAccount >> Result.isOk)
                                  reaction
                                  changeLog

                          result
                          |> function
                              | Error _ -> None
                              | Ok r -> Some r)
              )

              Define.Field(
                  "updateRamenProfile",
                  Nullable ProfileRamenFavoriteRamenyaType,
                  "update ramen profile",
                  [ Define.Input("user_id", String); Define.Input("best_ramenya", String) ],
                  fun ctx _ ->
                      sub
                      |> Option.bind (fun sub ->
                          let ramen: Profile.Ramen.FavoriteRamenya =
                              { user_id = ctx.Arg "user_id"
                                ramenya = ctx.Arg "best_ramenya"
                                timestamp = DateTimeOffset.Now }

                          let account: User.Account = { sub = sub; user_id = ramen.user_id }

                          ramen
                          |> Domain.updateFavoriteRamen
                              store.updateRamenProfile
                              account
                              (store.getAccount >> Result.isOk)
                          |> function
                              | Error _ -> None
                              | Ok follow -> Some follow)
              ) ]
    )
