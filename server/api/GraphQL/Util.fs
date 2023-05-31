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

let private schema (sub: Domain.sub option) (store: Store.IStore) : ISchema<Root> =
    upcast Schema(Query sub store, Mutation sub store, config = schemaConfig)

let executor (sub: Domain.sub option) (store: Store.IStore) = Executor(schema sub store)
