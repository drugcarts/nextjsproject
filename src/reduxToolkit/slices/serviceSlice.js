import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    serviceList: [],
    serviceUrl: {},
}
const serviceSlice = createSlice({
    name: 'service',
    initialState: initialState,
    reducers: {
        getServiceList: (state, { payload }) => {
            state.serviceList = payload
        },
        getServiceUrl: (state, { payload }) => {
            state.serviceUrl = payload
        }
    }
})

export const { getServiceList, getServiceUrl } = serviceSlice.actions
export default serviceSlice.reducer