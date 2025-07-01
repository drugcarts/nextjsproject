import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    manufactuerList: [],
    newManufactuer: {},
    manufactuer: {},
    manufactuerurl: {},
    firstLetter: [],
}
const manufactuerSlice = createSlice({
    name: 'manufactuer',
    initialState: initialState,
    reducers: {
        addManufactuer: (state, { payload }) => {
            state.newManufactuer = payload
        },
        getManufactuers: (state, { payload }) => {
            state.manufactuerList = payload
        },
        getManufactuer: (state, { payload }) => {
            state.manufactuer = payload
        },
        getManufactuerUrl: (state, { payload }) => {
            state.manufactuerurl = payload
        },
        getManufactuerLetter: (state, { payload }) => {
            state.firstLetter = payload
        },
    }
})

export const { addManufactuer, getManufactuers, getManufactuer,getManufactuerUrl, getManufactuerLetter } = manufactuerSlice.actions
export default manufactuerSlice.reducer