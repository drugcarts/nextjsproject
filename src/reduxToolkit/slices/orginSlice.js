import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orginList: [],
    newOrgin: {},
    orgin: {},
}
const orginSlice = createSlice({
    name: 'orgin',
    initialState: initialState,
    reducers: {
        addOrgin: (state, { payload }) => {
            state.newOrgin = payload
        },
        getOrgins: (state, { payload }) => {
            state.orginList = payload
        },
        getOrgin: (state, { payload }) => {
            state.orgin = payload
        }
    }
})

export const { addOrgin, getOrgins, getOrgin } = orginSlice.actions
export default orginSlice.reducer