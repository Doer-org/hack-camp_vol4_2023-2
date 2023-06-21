module GraphQL.Schema.Types

#nowarn "40"

open FSharp.Data.GraphQL.Types

open Domain

type Root = { RequestId: string }

module Response =
    type User =
        { data: Domain.User
          follow: Domain.User list
          follower: Domain.User list
          user_log: User.Log option }

let UserDataType =
    Define.Object<User>(
        name = "data",
        description = "user data",
        isTypeOf = (fun o -> o :? User),
        fieldsFn =
            fun () ->
                [ Define.Field("user_id", String, (fun _ user -> user.user_id))
                  Define.Field(
                      "user_name",
                      String,
                      (fun _ user -> user.user_name)
                  )
                  Define.Field(
                      "image_url",
                      String,
                      (fun _ user -> user.image_url)
                  ) ]
    )


let UserLogType =
    Define.Object<User.Log>(
        name = "user_log",
        description = "タイムラインの最終アクセスがいつか",
        isTypeOf = (fun o -> o :? User.Account),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "user_id",
                      String,
                      (fun _ user_log -> user_log.user_id)
                  )
                  Define.Field(
                      "timeline_last_access",
                      String,
                      (fun _ user_log ->
                          user_log.timeline_last_access.LocalDateTime.ToString
                              ())
                  ) ]
    )

let UserType =
    Define.Object<Response.User>(
        name = "user",
        description = "user",
        isTypeOf = (fun o -> o :? Response.User),
        fieldsFn =
            fun () ->
                [ Define.Field("data", UserDataType, (fun _ user -> user.data))
                  Define.Field(
                      "follow",
                      ListOf UserDataType,
                      (fun _ user -> user.follow)
                  )
                  Define.Field(
                      "follower",
                      ListOf UserDataType,
                      (fun _ user -> user.follower)
                  )
                  Define.Field(
                      "user_log",
                      Nullable UserLogType,
                      (fun _ user -> user.user_log)
                  ) ]
    )

let UserFollowType =
    Define.Object<User.Follow>(
        name = "user_follow",
        description = "Follow",
        isTypeOf = (fun o -> o :? Profile),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "user_id_from",
                      String,
                      (fun _ follow -> follow.user_id_from)
                  )
                  Define.Field(
                      "user_id_to",
                      String,
                      (fun _ follow -> follow.user_id_to)
                  ) ]
    )

let ProfileChangeLogType =
    Define.Object<Profile.ChangeLog>(
        name = "profile_change_log",
        description = "変更履歴",
        isTypeOf = (fun o -> o :? Profile.ChangeLog),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "user_id",
                      String,
                      (fun _ change_log -> change_log.user_id)
                  )
                  Define.Field(
                      "summary",
                      String,
                      (fun _ change_log -> change_log.summary)
                  )
                  Define.Field(
                      "timestamp",
                      String,
                      (fun _ change_log ->
                          change_log.timestamp.LocalDateTime.ToString())
                  ) ]
    )

let ProfileReactionType =
    Define.Object<Profile.Reaction>(
        name = "profile_reaction",
        description = "リアクション",
        isTypeOf = (fun o -> o :? Profile.Reaction),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "user_id_from",
                      String,
                      (fun _ reaction -> reaction.user_id_from)
                  )
                  Define.Field(
                      "user_id_to",
                      String,
                      (fun _ reaction -> reaction.user_id_to)
                  )
                  Define.Field(
                      "kind",
                      String,
                      (fun _ reaction -> reaction.kind)
                  )
                  Define.Field(
                      "timestamp",
                      String,
                      (fun _ reaction ->
                          reaction.timestamp.LocalDateTime.ToString())
                  ) ]
    )

let ProfileRamenFavoriteRamenyaType =
    Define.Object<Profile.Ramen.FavoriteRamenya>(
        name = "ramen_favorite_ramenya",
        description = "ラーメン屋",
        isTypeOf = (fun o -> o :? Profile.Ramen.FavoriteRamenya),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "user_id",
                      String,
                      (fun _ favorite_ramenya -> favorite_ramenya.user_id)
                  )
                  Define.Field(
                      "ramenya",
                      String,
                      (fun _ favorite_ramenya -> favorite_ramenya.ramenya)
                  )
                  Define.Field(
                      "rank",
                      Int,
                      (fun _ favorite_ramenya -> favorite_ramenya.rank)
                  )
                  Define.Field(
                      "timestamp",
                      String,
                      (fun _ favorite_ramenya ->
                          favorite_ramenya.timestamp.LocalDateTime.ToString())
                  ) ]
    )

let ProfileMusicFavoriteMusicType =
    Define.Object<Profile.Music.FavoriteMusic>(
        name = "music_favorite_music",
        description = "音楽",
        isTypeOf = (fun o -> o :? Profile.Music.FavoriteMusic),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "user_id",
                      String,
                      (fun _ favorite_music -> favorite_music.user_id)
                  )
                  Define.Field(
                      "music",
                      String,
                      (fun _ favorite_music -> favorite_music.music)
                  )
                  Define.Field(
                      "rank",
                      Int,
                      (fun _ favorite_music -> favorite_music.rank)
                  )
                  Define.Field(
                      "timestamp",
                      String,
                      (fun _ favorite_music ->
                          favorite_music.timestamp.LocalDateTime.ToString())
                  ) ]
    )

let ProfileMusicFavoriteArtistType =
    Define.Object<Profile.Music.FavoriteArtist>(
        name = "music_favorite_artist",
        description = "アーティスト",
        isTypeOf = (fun o -> o :? Profile.Music.FavoriteArtist),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "user_id",
                      String,
                      (fun _ favorite_artist -> favorite_artist.user_id)
                  )
                  Define.Field(
                      "artist",
                      String,
                      (fun _ favorite_artist -> favorite_artist.artist)
                  )
                  Define.Field(
                      "rank",
                      Int,
                      (fun _ favorite_artist -> favorite_artist.rank)
                  )
                  Define.Field(
                      "timestamp",
                      String,
                      (fun _ favorite_artist ->
                          favorite_artist.timestamp.LocalDateTime.ToString())
                  ) ]
    )

let ProfileType =
    Define.Object<Profile>(
        name = "profile",
        description = "プロフィール",
        isTypeOf = (fun o -> o :? Profile),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "ramen",
                      ListOf ProfileRamenFavoriteRamenyaType,
                      (fun _ profile -> profile.ramens)
                  )
                  Define.Field(
                      "music",
                      ListOf ProfileMusicFavoriteMusicType,
                      (fun _ profile -> profile.musics)
                  )
                  Define.Field(
                      "artist",
                      ListOf ProfileMusicFavoriteArtistType,
                      (fun _ profile -> profile.artists)
                  )
                  Define.Field(
                      "reaction",
                      ListOf ProfileReactionType,
                      (fun _ profile -> profile.reactions)
                  ) ]
    )

let RootType =
    Define.Object<Root>(
        name = "Root",
        description = "Root type passed to all resolvers.",
        isTypeOf = (fun o -> o :? Root),
        fieldsFn =
            fun () ->
                [ Define.Field(
                      "requestId",
                      String,
                      "The ID of the client.",
                      (fun _ (r: Root) -> r.RequestId)
                  ) ]
    )
