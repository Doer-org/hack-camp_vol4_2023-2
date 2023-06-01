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

let private schema isTest (sub: Domain.sub option) (store: Store.IStore) : ISchema<Root> =
    upcast Schema(Query isTest sub store, Mutation isTest sub store, config = schemaConfig)

let executor (isTest: bool) (sub: Domain.sub option) (store: Store.IStore) = Executor(schema isTest sub store)
