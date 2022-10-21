import {createSlice} from '@reduxjs/toolkit'


export class indexData {
    constructor(value: any, title: string) {
        this.value = value;
        this.title = title;
    }
    value: number;
    title: string;
}

const snpData: indexData = {
    title: "SNP",
    value: 250
};

const dwData: indexData = {
    title: "DW",
    value: 149
};

const initialState = {
    indexValueArray : [snpData,dwData],
}

export const indexDatabaseSlice = createSlice({
    name: 'indexDatabase', initialState, reducers: {
        setValues: (state, indexValues) => {
            for(let i = 0; indexValues.payload.length > i; i++) {
                state.indexValueArray.push( indexValues.payload[i]);
            }
        },
    },
})

export const {setValues} = indexDatabaseSlice.actions;

export default indexDatabaseSlice.reducer
