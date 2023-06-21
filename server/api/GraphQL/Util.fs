module GraphQL.Util

open FSharp.Data.GraphQL
open FSharp.Data.GraphQL.Types

open Schema.Types
open Schema.Query
open Schema.Mutation

let private schemaConfig =
    { SchemaConfig.Default with
        Types =
            [ UserType
              UserFollowType
              UserLogType
              UserType
              ProfileType
              ProfileChangeLogType
              ProfileMusicFavoriteArtistType
              ProfileMusicFavoriteMusicType
              ProfileRamenFavoriteRamenyaType
              ProfileReactionType ] }

let private schema
    isTest
    (token: Domain.Token option)
    (store: Store.IStore)
    : ISchema<Root> =
    upcast
        Schema(
            Query isTest token store,
            Mutation isTest token store,
            config = schemaConfig
        )

let executor (isTest: bool) (token: Domain.Token option) (store: Store.IStore) =
    Executor(schema isTest token store)
