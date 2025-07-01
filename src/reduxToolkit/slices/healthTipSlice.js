import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    healthTipList: [],
    newHealthTip: {},
    healthTip: {},
    healthTipUrl: {}
}
const healthTipSlice = createSlice({
    name: 'tips',
    initialState: initialState,
    reducers: {
        addhealthTip: (state, { payload }) => {
            state.newHealthTip = payload
        },
        gethealthTips: (state, { payload }) => {
            state.healthTipList = payload
        },
        gethealthTip: (state, { payload }) => {
            state.healthTip = payload
        },
        gethealthTipUrl: (state, { payload }) => {
            state.healthTipUrl = payload
        }
    }
})

export const { addhealthTip, gethealthTips, gethealthTip, gethealthTipUrl } = healthTipSlice.actions
export default healthTipSlice.reducer