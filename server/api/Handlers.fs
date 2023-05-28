module Handlers

open System
open Falco
open Domain
open Database
open Store

module Error =
    let index: HttpHandler = fun ctx -> Response.ofJson {| message = "error!" |} ctx

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

    /// POST /users { user_name: string }
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
