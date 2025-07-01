import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    labPackageList: [],
    newLabPackage: {},
    labPackage: {},
    labPackageUrl: {}
}
const labPackageSlice = createSlice({
    name: 'lab_packages',
    initialState: initialState,
    reducers: {
        addLabPackage: (state, { payload }) => {
            state.newLabPackage = payload
        },
        getLabPackages: (state, { payload }) => {
            state.labPackageList = payload
        },
        getLabPackage: (state, { payload }) => {
            state.labPackage = payload
        },
        getLabPackageUrl: (state, { payload }) => {
            state.labPackageUrl = payload
        }
    }
})

export const { addLabPackage, getLabPackages, getLabPackage, getLabPackageUrl } = labPackageSlice.actions
export default labPackageSlice.reducer