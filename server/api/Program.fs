module Program =
    open System
    open Falco
    open Falco.Routing
    open Falco.HostBuilder
    open Microsoft.Extensions.DependencyInjection
    open MySql.Data.MySqlClient

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

        let storeService =
            let connectionString =
                $"Server={env.DB_HOST};Port=3306;Database={env.DB_DATABASE};user={env.DB_USER};password={env.DB_PASSWORD}"

            let dbFactory =
                { new Database.IDbConnectionFactory with
                    member _.CreateConnection() =
                        let conn = new MySqlConnection(connectionString)
                        conn.Open()
                        conn }

            let store =
                { new Store.IStore with

                    member _.createAccount(account: Domain.User.Account) =
                        let conn = dbFactory.CreateConnection()
                        

                        Error "aaa"

                    member _.createUser(user: Domain.User) =
                        let conn = dbFactory.CreateConnection()
                        let _ = Database.User.save conn user
                        Ok user

                    member _.followUser(follow: Domain.User.Follow) = Error "ww"

                    member _.unfollowUser(follow: Domain.User.Follow) = Error "ww"

                    member _.updateReaction(reaction: Domain.Profile.Reaction) = Error "ww"

                    member _.updateRamenProfile(ramenya: Domain.Profile.Ramen.FavoriteRamenya) = Error "ww"



                    member _.getUser(user_id: string) =
                        let conn = dbFactory.CreateConnection()
                        let user = Database.User.get conn user_id
                        Ok user

                    member _.getAccount(account: Domain.User.Account) = Error "aaa"

                    member _.getAccountBySub(sub: Domain.sub) = Error "aaa"

                    member _.getAllUsers() =
                        let conn = dbFactory.CreateConnection()
                        let users = Database.User.getAll conn |> Seq.toList
                        Ok users

                    member _.getFollowingUsers(user_id: Domain.UserID) = Error "ww"

                    member _.getFollowers(user_id: Domain.UserID) = Error "ww"

                    member _.getTimeline(user_id: Domain.UserID) = Error "ww"

                    member _.getAllTimeline() = Error "ww"

                    member _.getProfile(user_id: Domain.UserID) = Error "ww"

                    member _.getReaction(user_id: Domain.UserID) = Error "ww"

                    member _.getBookmarkUsers(user_id: Domain.UserID) = Error "ww"

                    member _.getRamenProfile(user_id: Domain.UserID) = Error "ww"

                }

            fun (svc: IServiceCollection) -> svc.AddSingleton<Store.IStore>(fun _ -> store)

        let validate permissions handler : HttpHandler =
            if (env.ENVIRONMENT = "test") then
                handler
            else
                Auth.validate
                    (env.AUTH0_JWKS, env.AUTH0_AUDIENCE, env.AUTH0_AUDIENCE)
                    permissions
                    Rest.Handlers.Error.index
                    handler


        webHost [||] {
            add_service storeService

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
                  post
                      "/graphql"
                      (GraphQL.Handler.handleGraphQL (env.AUTH0_JWKS, env.AUTH0_AUDIENCE, env.AUTH0_AUDIENCE))
                  get "/users" (validate [] Rest.Handlers.Users.index)
                  get "/users/{id}" (validate [] Rest.Handlers.Users.read)
                  post "/users" (validate [] Rest.Handlers.Users.create) ]
        }

        0
