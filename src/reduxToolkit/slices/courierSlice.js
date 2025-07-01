import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    courierList: [],
    newCourier: {},
    courier: {},
}
const courierSlice = createSlice({
    name: 'courier',
    initialState: initialState,
    reducers: {
        addCourier: (state, { payload }) => {
            state.newCourier = payload
        },
        getCouriers: (state, { payload }) => {
            state.courierList = payload
        },
        getCourier: (state, { payload }) => {
            state.courier = payload
        }
    }
})

export const { addCourier, getCouriers, getCourier } = courierSlice.actions
export default courierSlice.reducer