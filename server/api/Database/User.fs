module Database.User

open System
open System.Data
open Domain
open Database

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
          user_name = rd.GetString(1)
          image_url = "" })
    |> Seq.tryHead

let getAll (conn: IDbConnection) : User seq =
    use cmd = conn.CreateCommand()
    cmd.CommandText <- "SELECT * FROM Users;"

    cmd.Query(fun rd ->
        { user_id = rd.GetOrdinal("user_id") |> rd.GetString
          user_name = rd.GetOrdinal("user_name") |> rd.GetString
          image_url = "" })
