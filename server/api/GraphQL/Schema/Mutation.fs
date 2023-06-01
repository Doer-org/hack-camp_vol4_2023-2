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


let private accountValidation store = fun _ -> true
// Utils.accountValidation store

let private createUser (sub: Domain.sub option) (store: Store.IStore) =
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
                    | None -> System.Guid.NewGuid() |> string //failwith "no sub"

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

let private updateReaction (sub: Domain.sub option) (store: Store.IStore) =
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
                    | Some sub -> sub
                    | None -> null //failwith "no sub"

            let reaction: Profile.Reaction =
                { reaction_id = System.Guid().ToString()
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
                    (fun _ -> ())
                    account
                    (accountValidation store)
                    reaction
                    changeLog

            result
            |> function
                | Error _ -> None
                | Ok r -> Some r
    )

let private updateRamenProfile (sub: Domain.sub option) (store: Store.IStore) =
    let args =
        {| user_id = "user_id"
           best_ramenya = "best_ramenya" |}

    Define.Field(
        MutationCommand.updateRamenProfile,
        Nullable ProfileRamenFavoriteRamenyaType,
        "update ramen profile",
        [ Define.Input(args.user_id, String); Define.Input(args.best_ramenya, String) ],
        fun ctx _ ->

            let sub =
                sub
                |> function
                    | Some sub -> sub
                    | None -> null //failwith "no sub"

            let ramen: Profile.Ramen.FavoriteRamenya =
                { ramenya_id = System.Guid() |> string
                  user_id = ctx.Arg args.user_id
                  ramenya = ctx.Arg args.best_ramenya
                  timestamp = DateTimeOffset.Now }

            let account: User.Account = { sub = sub; user_id = ramen.user_id }

            ramen
            |> Domain.updateFavoriteRamen store.updateRamenProfile account (accountValidation store)
            |> function
                | Error _ -> None
                | Ok follow -> Some follow
    )

let Mutation (sub: Domain.sub option) (store: Store.IStore) =
    Define.Object<Root>(
        name = "Mutation",
        fields = [ createUser sub store; updateReaction sub store; updateRamenProfile sub store ]
    )
