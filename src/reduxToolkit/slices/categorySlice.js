import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    newCategory: {},
    category: {},
    firstLetter: [],
    non_category: []
}
const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        addCategory: (state, { payload }) => {
            state.newCategory = payload
        },
        getCategories: (state, { payload }) => {
            state.categories = payload
        },
        getCategory: (state, { payload }) => {
            state.category = payload
        },
        getCategoryLetter: (state, { payload }) => {
            state.firstLetter = payload
        },
        getNonCategory: (state, { payload }) => {
            state.non_category = payload
        },
    }
})

export const { addCategory, getCategories, getCategory, getCategoryLetter, getNonCategory } = categorySlice.actions
export default categorySlice.reducer