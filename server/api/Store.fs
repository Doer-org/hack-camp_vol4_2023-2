module Store

open System
open System.Data
open Domain

type IStore =
    abstract member createUser: User -> Result<User, string>
    abstract member getUser: string -> Result<User option, string>
    abstract member getAllUsers: unit -> Result<User list, string>
