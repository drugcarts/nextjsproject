import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    labInfoList: [],
    labInfoUrl: {}
}
const labInfoSlice = createSlice({
    name: 'lab_info',
    initialState: initialState,
    reducers: {
        getLabInfoList: (state, { payload }) => {
            state.labInfoList = payload
        },
        getLabInfoUrl: (state, { payload }) => {
            state.labInfoUrl = payload
        },
    }
})

export const { getLabInfoList, getLabInfoUrl } = labInfoSlice.actions
export default labInfoSlice.reducer