import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    prescriptionList: [],
    newPrescription: {},
    prescription: {},
}
const prescriptionSlice = createSlice({
    name: 'prescription',
    initialState: initialState,
    reducers: {
        addPrescription: (state, { payload }) => {
            state.newPrescription = payload
        },
        getPrescriptions: (state, { payload }) => {
            state.prescriptionList = payload
        },
        getPrescription: (state, { payload }) => {
            state.prescription = payload
        }
    }
})

export const { addPrescription, getPrescriptions, getPrescription } = prescriptionSlice.actions
export default prescriptionSlice.reducer