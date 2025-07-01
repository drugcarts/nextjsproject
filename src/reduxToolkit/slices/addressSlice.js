import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addressList: [],
    newAddress: {},
    userAddress: [],
    addresses: {}
}
const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducers: {
        addAddress: (state, { payload }) => {
            state.newAddress = payload
        },
        getAddressList: (state, { payload }) => {
            state.addressList = payload
        },
        getUserAddress: (state, { payload }) => { 
            state.userAddress = payload
        },
        getAddress: (state, { payload }) => { 
            state.addresses = payload
        }
    }
})

export const { addAddress, getAddressList, getUserAddress, getAddress } = addressSlice.actions
export default addressSlice.reducer