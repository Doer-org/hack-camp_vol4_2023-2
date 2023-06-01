module Database.ProfileChangeLog

open System
open System.Data
open Domain.Profile
open Database

let create (conn: IDbConnection) (changelog: ChangeLog) : Result<ChangeLog, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO ProfileChangeLog (user_id, summary, timestamp)
            VALUES (@user_id, @summary, @timestamp);"

        cmd.AddParameter("user_id", changelog.user_id)
        cmd.AddParameter("summary", changelog.summary)
        cmd.AddParameter("timestamp", changelog.timestamp.DateTime)
        cmd.Execute()
        Ok changelog

    with e ->
        Error e.Message

let getByUserID (conn: IDbConnection) (user_id: string) : Result<ChangeLog list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM ProfileChangeLog
            WHERE user_id = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              summary = rd.GetOrdinal("summary") |> rd.GetString
              timestamp =
                rd.GetOrdinal("timestamp")
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
