open System

type User = { user_id: string; user_name: string }

module Database =
    open System.Data

    type IDbConnectionFactory =
        abstract member CreateConnection: unit -> IDbConnection

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

    module UserStore =
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

module Handlers =
    open Falco
    open Database

    module Users =
        /// GET /users
        let index: HttpHandler =
            fun ctx ->
                let users =
                    ctx.GetService<IDbConnectionFactory>()
                    |> fun factory -> factory.CreateConnection()
                    |> fun conn -> UserStore.getAll conn
                    |> Seq.toList

                Response.ofJson {| data = users |} ctx

        /// GET /users/{id}
        let read: HttpHandler =
            fun ctx ->
                let route = Request.getRoute ctx
                let id = route.GetString "id"

                let user =
                    ctx.GetService<IDbConnectionFactory>()
                    |> fun factory -> factory.CreateConnection()
                    |> fun conn -> UserStore.get conn id

                Response.ofJson {| data = user |} ctx

        /// POST /users { user_name: string}
        let create: HttpHandler =
            fun ctx ->
                let user_id = Guid.NewGuid() |> string

                let handleOk (param: {| user_name: string |}) : HttpHandler =
                    let user =
                        { user_id = user_id
                          user_name = param.user_name }

                    ctx.GetService<IDbConnectionFactory>()
                    |> fun factory -> factory.CreateConnection()
                    |> fun conn -> UserStore.save conn user

                    Response.ofJson {| data = user |}

                Request.mapJson handleOk ctx

module Program =
    open Falco
    open Falco.Routing
    open Falco.HostBuilder
    open Microsoft.Extensions.DependencyInjection
    open MySql.Data.MySqlClient
    open Database

    type DbConnectionFactory(connectionString: string) =
        interface IDbConnectionFactory with
            member _.CreateConnection() =
                let conn = new MySqlConnection(connectionString)
                conn.Open()
                conn

    [<EntryPoint>]
    let main _ =

        let ENV =
            {| ENVIRONMENT = Environment.GetEnvironmentVariable("ENVIRONMENT")
               DB_HOST = Environment.GetEnvironmentVariable("DB_HOST")
               DB_USER = Environment.GetEnvironmentVariable("DB_USER")
               DB_PASSWORD = Environment.GetEnvironmentVariable("DB_PASSWORD")
               DB_DATABASE = Environment.GetEnvironmentVariable("DB_DATABASE") |}

        let connectionString =
            $"Server={ENV.DB_HOST};Port=3306;Database={ENV.DB_DATABASE};user={ENV.DB_USER};password={ENV.DB_PASSWORD}"

        let dbConnectionService (svc: IServiceCollection) =
            svc.AddSingleton<IDbConnectionFactory, DbConnectionFactory>(fun _ -> DbConnectionFactory(connectionString))


        webHost [||] {
            add_service dbConnectionService

            endpoints
                [ get "/" (Response.ofPlainText $"Hello F# World! {ENV.ENVIRONMENT}")
                  get "/users" Handlers.Users.index
                  get "/users/{id}" Handlers.Users.read
                  post "/users" Handlers.Users.create ]
        }

        0
