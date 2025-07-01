import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    packageList: [],
    newPackage: {},
    pack: {},
    packid: {},
}
const packageSlice = createSlice({
    name: 'package',
    initialState: initialState,
    reducers: {
        addPackage: (state, { payload }) => {
            state.newPackage = payload
        },
        getPackages: (state, { payload }) => {
            state.packageList = payload
        },
        getPackage: (state, { payload }) => { 
            state.pack = payload
        },
        getPackageId: (state, { payload }) => {
      state.packid = payload;
    },
    }
})

export const { addPackage, getPackages, getPackage,getPackageId } = packageSlice.actions
export default packageSlice.reducer
