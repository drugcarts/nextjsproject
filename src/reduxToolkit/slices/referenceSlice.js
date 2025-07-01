import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    referenceList: [],
    newReference: {},
    reference: {},
}
const referenceSlice = createSlice({
    name: 'reference',
    initialState: initialState,
    reducers: {
        addReference: (state, { payload }) => {
            state.newReference = payload
        },
        getReferences: (state, { payload }) => {
            state.referenceList = payload
        },
        getReference: (state, { payload }) => {
            state.reference = payload
        }
    }
})

export const { addReference, getReferences, getReference } = referenceSlice.actions
export default referenceSlice.reducer