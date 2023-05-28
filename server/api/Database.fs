module Database

open System.Data

type IDbConnectionFactory =
    abstract member CreateConnection: unit -> IDbConnection
