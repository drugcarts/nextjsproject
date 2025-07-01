import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    countryCodeList: [],
    newCountryCode: {},
    countryCode: {},
}
const countryCodeSlice = createSlice({
    name: 'countryCode',
    initialState: initialState,
    reducers: {
        addCountryCode: (state, { payload }) => {
            state.newCountryCode = payload
        },
        getCountryCodes: (state, { payload }) => {
            state.countryCodeList = payload
        },
        getCountryCode: (state, { payload }) => {
            state.countryCode = payload
        }
    }
})

export const { addCountryCode, getCountryCodes, getCountryCode } = countryCodeSlice.actions
export default countryCodeSlice.reducer