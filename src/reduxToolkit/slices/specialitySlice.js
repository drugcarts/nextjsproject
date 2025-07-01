import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    specialList: [],
    newSpecial: {},
    special: {},
    specialUrl: {}
}
const specialitySlice = createSlice({
    name: 'speciality',
    initialState: initialState,
    reducers: {
        addSpeciality: (state, { payload }) => {
            state.newSpecial = payload
        },
        getSpecialitys: (state, { payload }) => {
            state.specialList = payload
        },
        getSpeciality: (state, { payload }) => {
            state.special = payload
        },
        getSpecialityUrl: (state, { payload }) => {
            state.specialUrl = payload
        }
    }
})

export const { addSpeciality, getSpecialitys, getSpeciality, getSpecialityUrl } = specialitySlice.actions
export default specialitySlice.reducer