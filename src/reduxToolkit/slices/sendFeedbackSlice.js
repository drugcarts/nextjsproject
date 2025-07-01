import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sendFeedbackList: [],
    newSendFeedback: {},
    sendFeedback: {},
}
const sendFeedbackSlice = createSlice({
    name: 'sendFeedback',
    initialState: initialState,
    reducers: {
        addSendFeedback: (state, { payload }) => {
            state.newSendFeedback = payload
        },
        getSendFeedbackList: (state, { payload }) => {
            state.sendFeedbackList = payload
        },
        getSendFeedback: (state, { payload }) => {
            state.sendFeedback = payload
        },
    }
})

export const { addSendFeedback, getSendFeedbackList, getSendFeedback } = sendFeedbackSlice.actions
export default sendFeedbackSlice.reducer