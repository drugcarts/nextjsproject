import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    labBookingList: [],
    newBooking: {},
    labBooking: {},
    myBookings: []
}
const labBookingSlice = createSlice({
    name: 'lab_booking',
    initialState: initialState,
    reducers: {
        addLabBooking: (state, { payload }) => {
            state.newBooking = payload
        },
        getLabBookings: (state, { payload }) => {
            state.labBookingList = payload
        },
        getLabBooking: (state, { payload }) => {
            state.labBooking = payload
        },
        getMyLabBooking: (state, { payload }) => {
            state.myBookings = payload
        }
    }
})

export const { addLabBooking, getLabBookings, getLabBooking, getMyLabBooking } = labBookingSlice.actions
export default labBookingSlice.reducer