import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notifyList: [],
    newNotify: {},
    notify: {},
    sendNotify: {}
}
const notifySlice = createSlice({
    name: 'notify',
    initialState: initialState,
    reducers: {
        addNotify: (state, { payload }) => {
            state.newNotify = payload
        },
        getNotifyList: (state, { payload }) => {
            state.notifyList = payload
        },
        getNotify: (state, { payload }) => {
            state.notify = payload
        },
        SendEmailNotify: (state, { payload }) => {
            state.sendNotify = payload
        },
    }
})

export const { addNotify, getNotifyList, getNotify, SendEmailNotify } = notifySlice.actions
export default notifySlice.reducer