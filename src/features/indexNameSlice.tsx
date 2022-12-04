import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    indexName : "asdasdsad"
}

export const indexDatabaseSlice = createSlice({
    name: 'indexDatabase', initialState, reducers: {
        setName: (state, value) => {
            state.indexName = value.payload;
        },
    },
})

export const {setName} = indexDatabaseSlice.actions;

export default indexDatabaseSlice.reducer
