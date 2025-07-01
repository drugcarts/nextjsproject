import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    storageList: [],
    newStorage: {},
    storage: {},
    storageid: {},
}
const storageSlice = createSlice({
    name: 'storage',
    initialState: initialState,
    reducers: {
        addStorage: (state, { payload }) => {
            state.newStorage = payload
        },
        getStorages: (state, { payload }) => {
            state.storageList = payload
        },
        getStorage: (state, { payload }) => { 
            state.storage = payload
        },
    getStorageId: (state, { payload }) => {
      state.storageid = payload;
    }
    }
})

export const { addStorage, getStorages, getStorage,getStorageId } = storageSlice.actions
export default storageSlice.reducer
