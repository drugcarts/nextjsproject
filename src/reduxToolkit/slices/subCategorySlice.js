import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    subCategories: [],
    newSubCategory: {},
    subCategory: {},
    subCateUrl: {},
    subCategoryUrl: []
}
const subCategorySlice = createSlice({
    name: 'subcategory',
    initialState: initialState,
    reducers: {
        addSubCategory: (state, { payload }) => {
            state.newSubCategory = payload
        },
        getSubCategories: (state, { payload }) => {
            state.subCategories = payload
        },
        getSubCategory: (state, { payload }) => {
            state.subCategory = payload
        },
        getSubCateUrl: (state, { payload }) => {
            state.subCateUrl = payload
        },
        getSubCategoryUrl: (state, { payload }) => {
            state.subCategoryUrl = payload
        }
    }
})

export const { addSubCategory, getSubCategories, getSubCategory,getSubCateUrl, getSubCategoryUrl } = subCategorySlice.actions
export default subCategorySlice.reducer