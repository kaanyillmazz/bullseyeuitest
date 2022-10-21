import {configureStore} from '@reduxjs/toolkit'
import indexDatabaseSlice from "../features/indexDatabaseSlice";

export const store = configureStore({
    reducer: {
        indexDatabase: indexDatabaseSlice
    },
})