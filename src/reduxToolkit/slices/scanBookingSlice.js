import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    scanBookingList: [],
    newScanBooking: {},
    scanBooking: {},
    scanEmail: {},
}
const scanBookingSlice = createSlice({
    name: 'scanBooking',
    initialState: initialState,
    reducers: {
        addBooking: (state, { payload }) => {
            state.newScanBooking = payload
        },
        getBookings: (state, { payload }) => {
            state.scanBookingList = payload
        },
        getBooking: (state, { payload }) => {
            state.scanBooking = payload
        },
        emailBooking: (state, { payload }) => {
            state.scanEmail = payload
        },
    }
})

export const { addBooking, getBookings, getBooking, emailBooking } = scanBookingSlice.actions
export default scanBookingSlice.reducer