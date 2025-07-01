import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contractUserList: [],
    newContractUser: {},
    contractUser: {},
}
const contractUserSlice = createSlice({
    name: 'contract_user',
    initialState: initialState,
    reducers: {
        addContractUser: (state, { payload }) => {
            state.newContractUser = payload
        },
        getContractUsers: (state, { payload }) => {
            state.contractUserList = payload
        },
        getContractUser: (state, { payload }) => {
            state.contractUser = payload
        },
    }
})

export const { addContractUser, getContractUsers, getContractUser } = contractUserSlice.actions
export default contractUserSlice.reducer