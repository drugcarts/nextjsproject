import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: {},
}
const profileSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        getProfile: (state, {payload}) => {
            state.profile = payload
        },
    }
})

export const { getProfile } = profileSlice.actions
export default profileSlice.reducer