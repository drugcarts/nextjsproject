import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contractUserList: [],
    contractUserProducts: []
}

const contractSlice = createSlice({
    name: 'contract',
    initialState: initialState,
    reducers: {
        getContractUser: (state, { payload }) => {
            state.contractUserList = payload
        },
        getContractUserProducts: (state, { payload }) => {
            state.contractUserProducts = payload
        },
    }
})

export const { getContractUser, getContractUserProducts } = contractSlice.actions
export default contractSlice.reducer