import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    diseasesList: [],
    newDiseases: {},
    diseases: {},
    diseasesUrl: {}
}
const diseasesSlice = createSlice({
    name: 'diseases',
    initialState: initialState,
    reducers: {
        addDiseases: (state, { payload }) => {
            state.newDiseases = payload
        },
        getDiseasesList: (state, { payload }) => {
            state.diseasesList = payload
        },
        getDiseases: (state, { payload }) => {
            state.diseases = payload
        },
        getDiseasesUrl: (state, { payload }) => {
            state.diseasesUrl = payload
        }
    }
})

export const { addDiseases, getDiseasesList, getDiseases, getDiseasesUrl } = diseasesSlice.actions
export default diseasesSlice.reducer