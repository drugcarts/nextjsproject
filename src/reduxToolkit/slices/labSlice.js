import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    labList: [],
    newLab: {},
    lab: {},
}
const labSlice = createSlice({
    name: 'lab',
    initialState: initialState,
    reducers: {
        addLab: (state, { payload }) => {
            state.newLab = payload
        },
        getLabs: (state, { payload }) => {
            state.labList = payload
        },
        getLab: (state, { payload }) => {
            state.lab = payload
        }
    }
})

export const { addLab, getLabs, getLab } = labSlice.actions
export default labSlice.reducer