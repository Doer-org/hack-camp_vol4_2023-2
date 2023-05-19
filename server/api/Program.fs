open Falco
open Falco.Routing
open Falco.HostBuilder

[<EntryPoint>]
let main _ =
    webHost [||] { endpoints [ get "/" (Response.ofPlainText "Hello F# World!") ] }

    0
