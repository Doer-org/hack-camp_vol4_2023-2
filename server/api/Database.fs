module Database

open System
open System.Data
open Domain

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

module User =
    let save (conn: IDbConnection) (user: User) : unit =
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
                INSERT INTO Users (user_id, user_name)
                VALUES (@user_id, @user_name);"

        cmd.AddParameter("user_id", user.user_id)
        cmd.AddParameter("user_name", user.user_name)

        cmd.Execute()

    let get (conn: IDbConnection) (user_id: string) : User option =
        use cmd = conn.CreateCommand()
        cmd.CommandText <- "SELECT * FROM Users WHERE user_id = @user_id;"
        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetString(0)
              user_name = rd.GetString(1) })
        |> Seq.tryHead

    let getAll (conn: IDbConnection) : User seq =
        use cmd = conn.CreateCommand()
        cmd.CommandText <- "SELECT * FROM Users;"

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              user_name = rd.GetOrdinal("user_name") |> rd.GetString })

type IDbConnectionFactory =
    abstract member CreateConnection: unit -> IDbConnection
