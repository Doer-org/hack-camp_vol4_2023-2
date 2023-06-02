module Database.FavoriteRamenya

open System
open System.Data
open Domain.Profile.Ramen
open Database

let update (conn: IDbConnection) (ramenya: FavoriteRamenya) : Result<FavoriteRamenya, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO FavoriteRamenya (`user_id`, `rank_n`, `ramenya`)
            VALUES (@user_id, @rank_n, @ramenya)
            ON DUPLICATE KEY UPDATE
                `user_id` = VALUES(`user_id`),
                `rank_n` = VALUES(`rank_n`),
                `ramenya` = VALUES(`ramenya`);"

        cmd.AddParameter("user_id", ramenya.user_id)
        cmd.AddParameter("rank_n", ramenya.rank)
        cmd.AddParameter("ramenya", ramenya.ramenya)
        cmd.Execute()
        Ok ramenya

    with e ->
        Error e.Message

let getByUserID (conn: IDbConnection) (user_id: string) : Result<FavoriteRamenya list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM FavoriteRamenya
            WHERE user_id = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              ramenya = rd.GetOrdinal("ramenya") |> rd.GetString
              rank = rd.GetOrdinal("rank_n") |> rd.GetInt32
              timestamp =
                rd.GetOrdinal("timestamp")
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
