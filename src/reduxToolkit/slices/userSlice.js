import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: [],
    newUser: {},
    errorOtp: false
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userRegister: (state, {payload}) => {
            state.user = payload
        },
        createUser: (state, {payload}) => {
            state.newUser = payload
        },
        GetErrorOtp: (state, {payload}) => {
            state.errorOtp = payload
        }
    }
})

export const { userRegister, createUser, GetErrorOtp } = userSlice.actions
export default userSlice.reducer