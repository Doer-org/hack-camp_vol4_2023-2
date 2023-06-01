module GraphQL.Schema.Mutation

open System
open FSharp.Data.GraphQL.Types

open GraphQL.Schema.Types
open Domain

module private MutationCommand =
    let createUser = "createUser"
    let updateFollow = "updateFollow"
    let updateReaction = "updateReaction"
    let updateRamenProfile = "updateRamenProfile"


let private createUser (isTest: bool) (sub: Domain.sub option) (store: Store.IStore) =
    let args = {| user_name = "user_name" |}

    Define.Field(
        MutationCommand.createUser,
        Nullable UserType,
        "create user",
        [ Define.Input(args.user_name, String) ],
        fun ctx _ ->
            let sub =
                sub
                |> function
                    | Some sub -> sub
                    | None ->
                        if isTest then
                            System.Guid.NewGuid() |> string
                        else
                            failwith "no sub"

            let user: User =
                { user_id = System.Guid.NewGuid() |> string
                  user_name = ctx.Arg args.user_name
                  image_url = "" }

            user
            |> Domain.createUser (Utils.checkSub store) (store.createAccount) (store.createUser) sub
            |> function
                | Error e -> failwith e
                | Ok user -> Some user
    )

let private createReaction (isTest: bool) (sub: Domain.sub option) (store: Store.IStore) =
    let args =
        {| user_id_from = "user_id_from"
           user_id_to = "user_id_to"
           kind = "kind" |}

    Define.Field(
        MutationCommand.updateReaction,
        Nullable ProfileReactionType,
        "update reaction",
        [ Define.Input(args.user_id_from, String)
          Define.Input(args.user_id_to, String)
          Define.Input(args.kind, String) ],
        fun ctx _ ->
            let sub =
                sub
                |> function
                    | None -> if isTest then null else failwith "no sub"
                    | Some sub -> sub

            let reaction: Profile.Reaction =
                { reaction_id = System.Guid.NewGuid() |> string
                  user_id_from = ctx.Arg args.user_id_from
                  user_id_to = ctx.Arg args.user_id_to
                  kind = ctx.Arg args.kind
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
                    account
                    (Utils.accountValidation isTest store)
                    reaction
                    changeLog

            result
            |> function
                | Error e -> failwith e
                | Ok r -> Some r
    )

let private updateRamenProfile (isTest: bool) (sub: Domain.sub option) (store: Store.IStore) =
    let args =
        {| user_id = "user_id"
           ramenya = "ramenya"
           rank = "rank" |}

    Define.Field(
        MutationCommand.updateRamenProfile,
        Nullable ProfileRamenFavoriteRamenyaType,
        "update ramen profile",
        [ Define.Input(args.user_id, String)
          Define.Input(args.ramenya, String)
          Define.Input(args.rank, Int) ],
        fun ctx _ ->

            let sub =
                sub
                |> function
                    | None -> if isTest then null else failwith "no sub"
                    | Some sub -> sub

            let ramen: Profile.Ramen.FavoriteRamenya =
                { rank = ctx.Arg args.rank
                  user_id = ctx.Arg args.user_id
                  ramenya = ctx.Arg args.ramenya
                  timestamp = DateTimeOffset.Now }

            let account: User.Account = { sub = sub; user_id = ramen.user_id }

            ramen
            |> Domain.updateFavoriteRamen
                store.updateRamenProfile
                (fun _ ->
                    let log: Domain.Profile.ChangeLog =
                        { user_id = ramen.user_id
                          summary = "update ramen profile"
                          timestamp = DateTimeOffset.Now }

                    store.createChangeLog log
                    |> function
                        | Error e -> printfn "%A" e
                        | Ok _ -> ())
                account
                (Utils.accountValidation isTest store)
            |> function
                | Error e -> failwith e
                | Ok follow -> Some follow
    )

let Mutation (isTest: bool) (sub: Domain.sub option) (store: Store.IStore) =
    Define.Object<Root>(
        name = "Mutation",
        fields =
            [ createUser isTest sub store
              createReaction isTest sub store
              updateRamenProfile isTest sub store ]
    )
