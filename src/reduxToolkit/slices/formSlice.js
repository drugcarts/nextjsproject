import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    formList: [],
    newForm: {},
    form: {},
}
const formSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        addForm: (state, { payload }) => {
            state.newForm = payload
        },
        getForms: (state, { payload }) => {
            state.formList = payload
        },
        getForm: (state, { payload }) => { 
            state.form = payload
        }
    }
})

export const { addForm, getForms, getForm } = formSlice.actions
export default formSlice.reducer