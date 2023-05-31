﻿module Store

open Domain

type IStore =
    abstract member createAccount: User.Account -> Result<User.Account, string>
    abstract member createUser: User -> Result<User, string>
    abstract member followUser: User.Follow -> Result<User.Follow, string>
    abstract member unfollowUser: User.Follow -> Result<User.Follow, string>
    abstract member updateReaction: Profile.Reaction -> Result<Profile.Reaction, string>
    abstract member updateRamenProfile: Profile.Ramen.FavoriteRamenya -> Result<Profile.Ramen.FavoriteRamenya, string>

    abstract member getUser: string -> Result<User option, string>
    abstract member getAccount: User.Account -> Result<User.Account, string>
    abstract member getAccountBySub: sub -> Result<User.Account, string>
    abstract member getAllUsers: unit -> Result<User list, string>
    abstract member getFollowingUsers: UserID -> Result<User list, string>
    abstract member getFollowers: UserID -> Result<User list, string>
    abstract member getTimeline: UserID -> Result<Profile.ChangeLog list, string>
    abstract member getAllTimeline: unit -> Result<Profile.ChangeLog list, string>
    abstract member getProfile: UserID -> Result<Profile, string>
    abstract member getReaction: UserID -> Result<Profile.Reaction list, string>
    abstract member getBookmarkUsers: UserID -> Result<User list, string>
    abstract member getRamenProfile: UserID -> Result<Profile.Ramen.FavoriteRamenya list, string>
