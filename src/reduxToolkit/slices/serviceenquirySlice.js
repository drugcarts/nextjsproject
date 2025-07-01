import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    serviceQuiryList: [],
    newServiceQuiry: {},
    serviceQuiry: {},
}
const serviceQuirySlice = createSlice({
    name: 'serviceQuiry',
    initialState: initialState,
    reducers: {
        addServiceQuiry: (state, { payload }) => {
            state.newServiceQuiry = payload
        },
        getServiceQuirys: (state, { payload }) => {
            state.serviceQuiryList = payload
        },
        getServiceQuiry: (state, { payload }) => {
            state.serviceQuiry = payload
        }
    }
})

export const { addServiceQuiry, getServiceQuirys, getServiceQuiry } = serviceQuirySlice.actions
export default serviceQuirySlice.reducer