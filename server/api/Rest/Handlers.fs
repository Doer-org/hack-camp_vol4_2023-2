module Rest.Handlers

open System
open Falco
open Domain
open Store

module Error =
    let index: HttpHandler =
        fun ctx -> Response.ofJson {| message = "error!" |} ctx

module Users =
    /// GET /users
    let index: HttpHandler =
        fun ctx ->
            let users =
                ctx.GetService<IStore>() |> (fun store -> store.getAllUsers ())

            match users with
            | Error e -> Response.ofJson {| error = e |} ctx
            | Ok users -> Response.ofJson {| data = users |} ctx

    /// GET /users/{id}
    let read: HttpHandler =
        fun ctx ->
            let route = Request.getRoute ctx
            let id = route.GetString "id"
            let user = ctx.GetService<IStore>() |> fun store -> store.getUser id

            match user with
            | Error e -> Response.ofJson {| error = e |} ctx
            | Ok user -> Response.ofJson {| data = user |} ctx

    /// POST /users { user_name: string }
    let create: HttpHandler =
        fun ctx ->
            let user_id = Guid.NewGuid() |> string

            let handleOk (param: {| user_name: string |}) : HttpHandler =
                let user =
                    { user_id = user_id
                      user_name = param.user_name
                      image_url = "" }

                let user =
                    ctx.GetService<IStore>()
                    |> fun store -> store.createUser user

                match user with
                | Error e -> Response.ofJson {| error = e |}
                | Ok user -> Response.ofJson {| data = user |}

            Request.mapJson handleOk ctx
