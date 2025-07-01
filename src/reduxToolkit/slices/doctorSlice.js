import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    doctorList: [],
    newDoctor: {},
    doctor: {},
    doctorUrl: [],
    callDoctorList: [],
    callDoctorId: {},
    newCallDoctor: {},
    doctor_name_url: {},
    askOnlineList: [],
    newAskOnline: {},
    askOnline: {},
    doctorBookingList: [],
    newDoctorBooking: {},
    doctorBooking: {},
    myAppointments: []
}
const doctorSlice = createSlice({
    name: 'doctor',
    initialState: initialState,
    reducers: {
        addDoctor: (state, { payload }) => {
            state.newDoctor = payload
        },
        getDoctorList: (state, { payload }) => {
            state.doctorList = payload
        },
        getDoctor: (state, { payload }) => {
            state.doctor = payload
        },
        getDoctorUrl: (state, { payload }) => {
            state.doctorUrl = payload
        },
        getDoctorNameUrl: (state, { payload }) => {
            state.doctor_name_url = payload
        },
        getCallDoctorList: (state, { payload }) => {
            state.callDoctorList = payload
        },
        addCallDoctor: (state, { payload }) => {
            state.newCallDoctor = payload
        },
        getCallDoctor: (state, { payload }) => {
            state.callDoctorId = payload
        },
        getAskOnlineList: (state, { payload }) => {
            state.askOnlineList = payload
        },
        addAskOnline: (state, { payload }) => {
            state.newAskOnline = payload
        },
        getAskOnline: (state, { payload }) => {
            state.askOnline = payload
        },
        getDoctorBookingList: (state, { payload }) => {
            state.doctorBookingList = payload
        },
        addDoctorBooking: (state, { payload }) => {
            state.newDoctorBooking = payload
        },
        getDoctorBooking: (state, { payload }) => {
            state.doctorBooking = payload
        },
        getDoctorAppointment: (state, { payload }) => {
            state.myAppointments = payload
        },
    }
})

export const {
    addDoctor,
    getDoctorList,
    getDoctor,
    getDoctorUrl,
    getDoctorNameUrl,
    getCallDoctorList,
    addCallDoctor,
    getCallDoctor,
    getAskOnlineList,
    addAskOnline,
    getAskOnline,
    getDoctorBookingList,
    addDoctorBooking,
    getDoctorBooking,
    getDoctorAppointment
} = doctorSlice.actions
export default doctorSlice.reducer