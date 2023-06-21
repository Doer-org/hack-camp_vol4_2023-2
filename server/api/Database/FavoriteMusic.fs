module Database.FavoriteMusic

open System
open System.Data
open Domain.Profile.Music
open Database

let update
    (conn: IDbConnection)
    (favoriteMusic: FavoriteMusic)
    : Result<FavoriteMusic, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO FavoriteMusic (`user_id`, `rank_n`, `music`)
            VALUES (@user_id, @rank_n, @music)
            ON DUPLICATE KEY UPDATE
                `user_id` = VALUES(`user_id`),
                `rank_n` = VALUES(`rank_n`),
                `music` = VALUES(`music`);"

        cmd.AddParameter("user_id", favoriteMusic.user_id)
        cmd.AddParameter("rank_n", favoriteMusic.rank)
        cmd.AddParameter("music", favoriteMusic.music)
        cmd.Execute()
        Ok favoriteMusic

    with e ->
        Error e.Message

let getByUserID
    (conn: IDbConnection)
    (user_id: string)
    : Result<FavoriteMusic list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM FavoriteMusic
            WHERE user_id = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              rank = rd.GetOrdinal("rank_n") |> rd.GetInt32
              music = rd.GetOrdinal("music") |> rd.GetString
              timestamp =
                rd.GetOrdinal("timestamp")
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
