module Program =
    open System
    open Falco
    open Falco.Routing
    open Falco.HostBuilder
    open Microsoft.Extensions.DependencyInjection
    open MySql.Data.MySqlClient
    open Database

    [<EntryPoint>]
    let main _ =
        let env =
            let ENVIRONMENT = Environment.GetEnvironmentVariable("ENVIRONMENT")
            let DB_HOST = Environment.GetEnvironmentVariable("DB_HOST")
            let DB_USER = Environment.GetEnvironmentVariable("DB_USER")
            let DB_PASSWORD = Environment.GetEnvironmentVariable("DB_PASSWORD")
            let DB_DATABASE = Environment.GetEnvironmentVariable("DB_DATABASE")
            let CLIENT_URL = Environment.GetEnvironmentVariable("CLIENT_URL")
            let AUTH0_DOMAIN = Environment.GetEnvironmentVariable("AUTH0_DOMAIN")
            let AUTH0_AUDIENCE = Environment.GetEnvironmentVariable("AUTH0_AUDIENCE")
            let AUTH0_JWKS = Environment.GetEnvironmentVariable("AUTH0_JWKS")

            { new Env.IEnv with
                member _.ENVIRONMENT = ENVIRONMENT
                member _.DB_HOST = DB_HOST
                member _.DB_USER = DB_USER
                member _.DB_PASSWORD = DB_PASSWORD
                member _.DB_DATABASE = DB_DATABASE
                member _.CLIENT_URL = CLIENT_URL
                member _.AUTH0_DOMAIN = AUTH0_DOMAIN
                member _.AUTH0_AUDIENCE = AUTH0_AUDIENCE
                member _.AUTH0_JWKS = AUTH0_JWKS }

        let dbConnectionService =
            let connectionString =
                $"Server={env.DB_HOST};Port=3306;Database={env.DB_DATABASE};user={env.DB_USER};password={env.DB_PASSWORD}"

            fun (svc: IServiceCollection) ->
                svc.AddSingleton<IDbConnectionFactory>(fun _ ->
                    { new IDbConnectionFactory with
                        member _.CreateConnection() =
                            let conn = new MySqlConnection(connectionString)
                            conn.Open()
                            conn })

        webHost [||] {
            add_service dbConnectionService

            use_cors "CorsPolicy" (fun options ->
                options.AddPolicy(
                    "CorsPolicy",
                    fun builder ->
                        builder.AllowAnyHeader() |> ignore
                        builder.AllowAnyMethod() |> ignore
                        builder.WithOrigins(env.CLIENT_URL).AllowCredentials() |> ignore
                ))

            endpoints
                [ get "/" (Response.ofPlainText $"Hello F# World! {env.ENVIRONMENT}")
                  get "/users" (Auth.validate env [] Handlers.Error.index Handlers.Users.index) // Auth.Permission.ReadResource
                  get "/users/{id}" (Auth.validate env [] Handlers.Error.index Handlers.Users.read)
                  post "/users" (Auth.validate env [] Handlers.Error.index Handlers.Users.create) ]
        }

        0
