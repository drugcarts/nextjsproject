import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    stockList: [],
    newStock: {},
    stock: {},
}
const stockSlice = createSlice({
    name: 'stock',
    initialState: initialState,
    reducers: {
        addStock: (state, { payload }) => {
            state.newStock = payload
        },
        getStocks: (state, { payload }) => {
            state.stockList = payload
        },
        getStock: (state, { payload }) => { 
            state.stock = payload
        }
    }
})

export const { addStock, getStocks, getStock } = stockSlice.actions
export default stockSlice.reducer