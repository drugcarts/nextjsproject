import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    countList: {},
}
const countSlice = createSlice({
    name: 'count',
    initialState: initialState,
    reducers: {
        getTotalCount: (state, { payload }) => {
            state.countList = payload
        },
    }
})

export const { getTotalCount } = countSlice.actions
export default countSlice.reducer