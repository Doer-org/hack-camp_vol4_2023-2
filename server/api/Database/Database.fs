module Database.Database

open System
open System.Data

type IDbCommand with

    member this.AddParameter(name: string, value: obj) =
        let param = this.CreateParameter()
        param.ParameterName <- name

        if isNull value then
            param.Value <- DBNull.Value
        else
            param.Value <- value

        this.Parameters.Add(param) |> ignore

    member private this.Prepare() =
        if this.Connection.State = ConnectionState.Closed then
            this.Connection.Open()

    member this.Execute() =
        this.Prepare()
        this.ExecuteNonQuery() |> ignore

    member this.Query(map: IDataRecord -> 'a) : 'a seq =
        this.Prepare()
        use rd = this.ExecuteReader()

        [ while rd.Read() do
              yield map rd ]

type IDbConnectionFactory =
    abstract member CreateConnection: unit -> IDbConnection
