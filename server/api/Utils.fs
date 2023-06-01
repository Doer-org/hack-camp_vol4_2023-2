module Utils



let accountValidation (store: Store.IStore) =

    //fun _ -> true

    store.getAccount >> Result.isOk

let checkSub (store: Store.IStore) = store.getAccountBySub >> Result.isOk
