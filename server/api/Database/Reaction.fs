module Database.Reaction

open System
open System.Data
open Domain.Profile
open Database

let update
    (conn: IDbConnection)
    (reaction: Reaction)
    : Result<Reaction, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            UPDATE Reaction
            SET user_id_from = @user_id_from,
                user_id_to = @user_id_to,
                kind = @kind
            WHERE reaction_id = @reaction_id;"

        cmd.AddParameter("user_id_from", reaction.user_id_from)
        cmd.AddParameter("user_id_to", reaction.user_id_to)
        cmd.AddParameter("kind", reaction.kind)
        cmd.AddParameter("reaction_id", reaction.reaction_id)
        cmd.Execute()
        Ok reaction

    with e ->
        Error e.Message

let create
    (conn: IDbConnection)
    (reaction: Reaction)
    : Result<Reaction, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO Reaction (reaction_id, user_id_from, user_id_to, kind, timestamp)
            VALUES (@reaction_id, @user_id_from, @user_id_to, @kind, @timestamp);"

        cmd.AddParameter("reaction_id", reaction.reaction_id)
        cmd.AddParameter("user_id_from", reaction.user_id_from)
        cmd.AddParameter("user_id_to", reaction.user_id_to)
        cmd.AddParameter("kind", reaction.kind)
        cmd.AddParameter("timestamp", reaction.timestamp)
        cmd.Execute()
        Ok reaction

    with e ->
        Error e.Message

let getByUserID
    (conn: IDbConnection)
    (user_id: string)
    : Result<Reaction list, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM Reaction
            WHERE user_id_from = @user_id OR user_id_to = @user_id;"

        cmd.AddParameter("user_id", user_id)

        cmd.Query(fun rd ->
            { reaction_id = rd.GetOrdinal("reaction_id") |> rd.GetString
              user_id_from = rd.GetOrdinal("user_id_from") |> rd.GetString
              user_id_to = rd.GetOrdinal("user_id_to") |> rd.GetString
              kind = rd.GetOrdinal("kind") |> rd.GetString
              timestamp =
                rd.GetOrdinal("timestamp")
                |> rd.GetDateTime
                |> fun t -> DateTimeOffset(t, TimeSpan.Zero) })
        |> Seq.toList
        |> Ok

    with e ->
        Error e.Message
