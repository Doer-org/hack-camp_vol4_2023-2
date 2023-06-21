module Utils

let accountValidation (isTest: bool) (store: Store.IStore) =

    if isTest then
        fun _ -> true
    else
        store.getAccount >> Result.isOk

let checkSub (store: Store.IStore) = store.getAccountBySub >> Result.isOk
