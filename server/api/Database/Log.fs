module Database.Log

open System
open System.Data
open Domain.User
open Database

let update (conn: IDbConnection) (log: Log) : Result<Log, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO Log (user_id, timeline_last_access)
            VALUES (@user_id, @timeline_last_access)
            ON DUPLICATE KEY UPDATE
                `timeline_last_access` = VALUES(`timeline_last_access`),
                `user_id` = VALUES(`user_id`);"

        cmd.AddParameter("user_id", log.user_id)
        cmd.AddParameter("timeline_last_access", log.timeline_last_access)
        cmd.Execute()
        Ok log

    with e ->
        Error e.Message

let getByUserID
    (conn: IDbConnection)
    (user_id: string)
    : Result<Log option, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM Log
            WHERE user_id = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { user_id = rd.GetOrdinal("user_id") |> rd.GetString
              timeline_last_access =
                rd.GetOrdinal("timeline_last_access")
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.tryHead
        |> Ok

    with e ->
        Error e.Message
