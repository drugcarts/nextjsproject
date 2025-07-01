import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    textFeedbackList: [],
    newTextFeedback: {},
    textFeedback: {},
}
const textFeedbackSlice = createSlice({
    name: 'text_feedback',
    initialState: initialState,
    reducers: {
        addTextFeedback: (state, { payload }) => {
            state.newTextFeedback = payload
        },
        getTextFeedbackList: (state, { payload }) => {
            state.textFeedbackList = payload
        },
        getTextFeedback: (state, { payload }) => {
            state.textFeedback = payload
        }
    }
})

export const { addTextFeedback, getTextFeedbackList, getTextFeedback } = textFeedbackSlice.actions
export default textFeedbackSlice.reducer