module Database.FavoriteArtist

open System
open System.Data
open Domain.Profile.Music
open Database

let create (conn: IDbConnection) (favoriteArtist: FavoriteArtist) : Result<FavoriteArtist, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO FavoriteArtist (user_id, rank, artist)
            VALUES (@user_id, @rank, @artist);"

        cmd.AddParameter("user_id", favoriteArtist.user_id)
        cmd.AddParameter("rank", favoriteArtist.rank)
        cmd.AddParameter("artist", favoriteArtist.artist)
        cmd.Execute()
        Ok favoriteArtist

    with e ->
        Error e.Message

let getByUserID (conn: IDbConnection) (user_id: string) : Result<FavoriteArtist list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM FavoriteArtist
            WHERE user_id = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              rank = rd.GetOrdinal("rank") |> rd.GetInt32
              artist = rd.GetOrdinal("artist") |> rd.GetString
              timestamp =
                "timestamp"
                |> rd.GetOrdinal
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
