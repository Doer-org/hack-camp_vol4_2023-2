module Database.Follow

open System.Data
open Domain
open Domain.User
open Database

let follow (conn: IDbConnection) (follow: User.Follow) : Result<User.Follow, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO Follow (`user_id_from`, `user_id_to`)
            VALUES (@user_id_from, @user_id_to)
            ON DUPLICATE KEY UPDATE
                `user_id_from` = VALUES(`user_id_from`),
                `user_id_to` = VALUES(`user_id_to`);"

        cmd.AddParameter("user_id_from", follow.user_id_from)
        cmd.AddParameter("user_id_to", follow.user_id_to)
        cmd.Execute()
        Ok follow

    with e ->
        Error e.Message

let unfollow (conn: IDbConnection) (follow: User.Follow) : Result<User.Follow, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            DELETE FROM Follow
            WHERE user_id_from = @user_id_from
            AND user_id_to = @user_id_to;"

        cmd.AddParameter("user_id_from", follow.user_id_from)
        cmd.AddParameter("user_id_to", follow.user_id_to)
        cmd.Execute()
        Ok follow

    with e ->
        Error e.Message

let getFollowing (conn: IDbConnection) (user_id: string) : Result<User list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT u.* FROM Users u
            INNER JOIN Follow f ON u.user_id = f.user_id_to
            WHERE f.user_id_from = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              user_name = rd.GetOrdinal("user_name") |> rd.GetString
              image_url = rd.GetOrdinal("image_url") |> rd.GetString })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message

let getFollowers (conn: IDbConnection) (user_id: string) : Result<User list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT u.* FROM Users u
            INNER JOIN Follow f ON u.user_id = f.user_id_from
            WHERE f.user_id_to = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              user_name = rd.GetOrdinal("user_name") |> rd.GetString
              image_url = rd.GetOrdinal("image_url") |> rd.GetString })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
