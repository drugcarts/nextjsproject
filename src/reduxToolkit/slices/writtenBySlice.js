import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    writtenByList: [],
    newWrittenBy: {},
    writtenBy: {},
}
const writtenBySlice = createSlice({
    name: 'writtenBy',
    initialState: initialState,
    reducers: {
        addWrittenBy: (state, { payload }) => {
            state.newWrittenBy = payload
        },
        getWrittenByes: (state, { payload }) => {
            state.writtenByList = payload
        },
        getWrittenBy: (state, { payload }) => {
            state.writtenBy = payload
        }
    }
})

export const { addWrittenBy, getWrittenByes, getWrittenBy } = writtenBySlice.actions
export default writtenBySlice.reducer