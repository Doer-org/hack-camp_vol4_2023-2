module Database.Account

open System.Data
open Domain.User
open Database

let create (conn: IDbConnection) (account: Account) : Result<Account, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            INSERT INTO Account (sub, user_id)
            VALUES (@sub, @user_id);"

        cmd.AddParameter("sub", account.sub)
        cmd.AddParameter("user_id", account.user_id)
        cmd.Execute()
        Ok account

    with e ->
        Error e.Message

let getBySub (conn: IDbConnection) (sub: string) : Result<Account, string> =
    try
        use cmd = conn.CreateCommand()

        cmd.CommandText <-
            "
            SELECT * FROM Account
            WHERE sub = @sub;"

        cmd.AddParameter("sub", sub)

        cmd.Query(fun rd ->
            { sub = rd.GetOrdinal("sub") |> rd.GetString
              user_id = rd.GetOrdinal("user_id") |> rd.GetString })
        |> Seq.tryHead
        |> function
            | Some account -> Ok account
            | None -> Error "Account not found."

    with e ->
        Error e.Message
