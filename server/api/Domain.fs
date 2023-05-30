module Domain

open System

type sub = string
type UserID = string

type User =
    { user_id: UserID
      user_name: string
      image_url: string }

module User =

    type Account = { sub: sub; user_id: UserID }

    type Log =
        { user_id: UserID
          timeline_last_access: DateTimeOffset }

    type Follow =
        { user_id_from: UserID
          user_id_to: UserID }

type Profile =
    { user_id: UserID
      details: string
      timestamp: DateTimeOffset }

module Profile =

    type ChangeLog =
        { user_id: UserID
          summary: string
          timestamp: DateTimeOffset }

    type Reaction =
        { user_id_from: UserID
          user_id_to: UserID
          kind: string
          timestamp: DateTimeOffset }

    module Ramen =
        type FavoriteRamenya =
            { user_id: UserID
              best_ramenya: string
              timestamp: DateTimeOffset }

    module Music =

        type FavoriteMusic =
            { user_id: UserID
              artist_info: string
              rank: int
              timestamp: DateTimeOffset }

        type FavoriteArtist =
            { user_id: UserID
              artist_info: string
              rank: int
              timestamp: DateTimeOffset }


type private CommandResult<'T> = Result<'T, string>

type private ValidateAccount = User.Account -> bool

module Command =

    type CreateUser = sub -> User -> CommandResult<User>

    type UpdateUserLog = User.Account -> ValidateAccount -> User.Log -> CommandResult<User.Log>

    type UpdateFollow =
        User.Account
            -> ValidateAccount
            -> {| follow: User.Follow
                  isFollow: bool |}
            -> CommandResult<User.Follow option>

    type UpdateReaction =
        User.Account -> ValidateAccount -> Profile.Reaction -> Profile.ChangeLog -> CommandResult<Profile.Reaction>

    type UpdateFavoriteMusic =
        User.Account -> ValidateAccount -> Profile.Music.FavoriteMusic -> CommandResult<Profile.Music.FavoriteMusic>

    type UpdateFavoriteArtist =
        User.Account -> ValidateAccount -> Profile.Music.FavoriteArtist -> CommandResult<Profile.Music.FavoriteArtist>


module Query =

    type GetAllTimeline = unit -> CommandResult<Profile.ChangeLog seq>

    type GetFollowingUsersTimeline =
        User.Account
            -> ValidateAccount
            -> DateTimeOffset
            -> Command.UpdateUserLog
            -> CommandResult<Profile.ChangeLog seq>

    type GetProfile = User.Account -> ValidateAccount -> CommandResult<Profile>

    type GetReaction = User.Account -> ValidateAccount -> CommandResult<Profile.Reaction seq>

    type GetBookmark = User.Account -> ValidateAccount -> CommandResult<Profile.Reaction seq>

    type GetFollowingUsers = User.Account -> ValidateAccount -> CommandResult<User seq>

    type GetFollower = User.Account -> ValidateAccount -> CommandResult<{| user: User; follow: User.Follow |} seq>


type private Update<'T> = 'T -> CommandResult<'T>
type private Query<'Input, 'Output> = 'Input -> CommandResult<'Output>

let createUser
    (existAccount: sub -> bool)
    (createAccount: Update<User.Account>)
    (createUser: Update<User>)
    : Command.CreateUser =
    fun (sub: sub) (user: User) ->
        if not (existAccount sub) then
            Ok user
        else
            let account: User.Account = { sub = sub; user_id = user.user_id }
            account |> createAccount |> Result.bind (fun _ -> createUser user)

let private validAccount (valid: User.Account -> bool) =
    fun account f -> if not (valid account) then Error "account error" else f ()

let updateUserLog (update: Update<User.Log>) : Command.UpdateUserLog =
    fun (account: User.Account) valid log -> validAccount valid account (fun _ -> update log)

let updateFollowUser
    (follow: User.Follow -> CommandResult<unit>)
    (unfollow: User.Follow -> CommandResult<unit>)
    : Command.UpdateFollow =
    fun account valid args ->
        validAccount valid account (fun _ ->
            if args.isFollow then
                follow args.follow |> Result.map (fun _ -> Some args.follow)
            else
                unfollow args.follow |> Result.map (fun _ -> None))

let updateReaction (update: Update<Profile.Reaction>) (profileChangeLogger) : Command.UpdateReaction =
    fun account valid reaction log ->
        validAccount valid account (fun _ ->
            let r = update reaction

            if Result.isOk r then
                profileChangeLogger log

            r)

let updateFavoriteMusic (update: Update<Profile.Music.FavoriteMusic>) : Command.UpdateFavoriteMusic =
    fun account valid music -> validAccount valid account (fun _ -> update music)

let updateFavoriteArtist (update: Update<Profile.Music.FavoriteArtist>) : Command.UpdateFavoriteArtist =
    fun account valid artist -> validAccount valid account (fun _ -> update artist)

let getAllTimeline (query: Query<unit, Profile.ChangeLog seq>) : Query.GetAllTimeline = query

let getFollowingUsersTimeline (query: Query<UserID, Profile.ChangeLog seq>) : Query.GetFollowingUsersTimeline =
    fun account valid time updateLog ->
        validAccount valid account (fun _ ->
            let summaries = query account.user_id

            let log: User.Log =
                { user_id = account.user_id
                  timeline_last_access = time }

            let _ = updateLog account valid log

            summaries)

let getProfile (query: Query<UserID, Profile>) : Query.GetProfile =
    fun account valid -> validAccount valid account (fun _ -> query account.user_id)

let getReaction (query: Query<UserID, Profile.Reaction seq>) : Query.GetReaction =
    fun account valid -> validAccount valid account (fun _ -> query account.user_id)

let getBookmark (query: Query<UserID, Profile.Reaction seq>) : Query.GetBookmark =
    fun account valid -> validAccount valid account (fun _ -> query account.user_id)

let getFollowingUsers (query: Query<UserID, User seq>) : Query.GetFollowingUsers =
    fun account valid -> validAccount valid account (fun _ -> query account.user_id)

let getFollower (query: Query<UserID, {| user: User; follow: User.Follow |} seq>) : Query.GetFollower =
    fun account valid -> validAccount valid account (fun _ -> query account.user_id)
