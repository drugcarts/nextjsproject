import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: [],
    newProduct: {},
    product: {},
    productGenericUrl: [],
    productCategory: [],
    productName: [],
    categoryProducts: [],
    personalCareProduct: [],
    fitnessProduct: [],
    treatmentProduct: [],
    productManufactuerUrl: [],
    productTypeList: []
}
const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        addProduct: (state, { payload }) => {
            state.newProduct = payload
        },
        getProducts: (state, { payload }) => {
            state.productList = payload
        },
        getProduct: (state, { payload }) => {
            state.product = payload
        },
        getGenericProductUrl: (state, { payload }) => {
            state.productGenericUrl = payload
        },
        getManufactuerProductUrl: (state, { payload }) => {
            state.productManufactuerUrl = payload
        },
        getProductCategory: (state, { payload }) => {
            state.productCategory = payload
        },
        getProductName: (state, { payload }) => {
            state.productName = payload
        },
        GetProductCats: (state, { payload }) => {
            state.categoryProducts = payload;
        },
        GetPersonalCareProduct: (state, { payload }) => {
            state.personalCareProduct = payload;
        },
        GetFitnessProduct: (state, { payload }) => {
            state.fitnessProduct = payload;
        },
        GetTreatmentProduct: (state, { payload }) => {
            state.treatmentProduct = payload;
        },
        GetProductTypes: (state, { payload }) => {
            state.productTypeList = payload;
        },
    }
})

export const { addProduct, getProducts, getProduct, getGenericProductUrl, getManufactuerProductUrl, getProductCategory, getProductName, GetProductCats, GetPersonalCareProduct, GetFitnessProduct, GetTreatmentProduct, GetProductTypes } = productSlice.actions
export default productSlice.reducer