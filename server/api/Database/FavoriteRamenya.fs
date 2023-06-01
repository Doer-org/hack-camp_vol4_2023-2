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
            UPDATE FavoriteRamenya
            SET ramenya = @ramenya
            WHERE user_id = @user_id
            AND ramenya_id = @ramenya_id;"

        cmd.AddParameter("user_id", ramenya.user_id)
        cmd.AddParameter("ramenya_id", ramenya.ramenya_id)
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
            { ramenya_id = rd.GetOrdinal("ramenya_id") |> rd.GetString
              user_id = rd.GetOrdinal("user_id") |> rd.GetString
              ramenya = rd.GetOrdinal("ramenya") |> rd.GetString
              timestamp =
                rd.GetOrdinal("timestamp")
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
