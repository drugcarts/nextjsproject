import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    LocationList: [],
    newLocation: {},
    location: {},
    postalCodes: [],
    postalCode: {}
}
const locationSlice = createSlice({
    name: 'location',
    initialState: initialState,
    reducers: {
        addLocation: (state, { payload }) => {
            state.newLocation = payload
        },
        getLocationList: (state, { payload }) => {
            state.LocationList = payload
        },
        getLocation: (state, { payload }) => {
            state.location = payload
        },
        getPostalCodes: (state, { payload }) => {
            state.postalCodes = payload
        },
        getPostalCode: (state, { payload }) => {
            state.postalCode = payload
        },
    }
})

export const { addLocation, getLocationList, getLocation, getPostalCodes, getPostalCode } = locationSlice.actions
export default locationSlice.reducer