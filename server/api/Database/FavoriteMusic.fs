module Database.FavoriteMusic

open System
open System.Data
open Domain.Profile.Music
open Database

let create (conn: IDbConnection) (favoriteMusic: FavoriteMusic) : Result<FavoriteMusic, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO FavoriteMusic (user_id, rank, music)
            VALUES (@user_id, @rank, @music);"

        cmd.AddParameter("user_id", favoriteMusic.user_id)
        cmd.AddParameter("rank", favoriteMusic.rank)
        cmd.AddParameter("music", favoriteMusic.music)
        cmd.Execute()
        Ok favoriteMusic

    with e ->
        Error e.Message

let getByUserID (conn: IDbConnection) (user_id: string) : Result<FavoriteMusic list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM FavoriteMusic
            WHERE user_id = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetString(0)
              rank = rd.GetInt32(1)
              music = rd.GetString(2)
              timestamp =
                rd.GetOrdinal("timestamp")
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
