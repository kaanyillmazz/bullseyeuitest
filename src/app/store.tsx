import {configureStore} from '@reduxjs/toolkit'
import indexDatabaseSlice from "../features/indexDatabaseSlice";
import indexNameSlice from "../features/indexNameSlice";

export const store = configureStore({
    reducer: {
        indexDatabase: indexDatabaseSlice,
        indexName : indexNameSlice
    },
})