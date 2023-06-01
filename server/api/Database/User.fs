module Database.User

open System.Data
open Domain
open Database

let save (conn: IDbConnection) (user: User) : Result<User, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO Users (user_id, user_name, image_url)
            VALUES (@user_id, @user_name, @image_url);"

        cmd.AddParameter("user_id", user.user_id)
        cmd.AddParameter("user_name", user.user_name)
        cmd.AddParameter("image_url", user.image_url)
        cmd.Execute()
        Ok user

    with e ->
        Error e.Message

let get (conn: IDbConnection) (user_id: string) : Result<User option, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM Users
            WHERE user_id = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              user_name = rd.GetOrdinal("user_name") |> rd.GetString
              image_url = rd.GetOrdinal("image_url") |> rd.GetString })
        |> Seq.tryHead
        |> Ok

    with e ->
        Error e.Message

let getAll (conn: IDbConnection) : User seq =
    use cmd = conn.CreateCommand()
    cmd.CommandText <- "SELECT * FROM Users;"

    cmd.Query(fun rd ->
        { user_id = rd.GetOrdinal("user_id") |> rd.GetString
          user_name = rd.GetOrdinal("user_name") |> rd.GetString
          image_url = "" })
