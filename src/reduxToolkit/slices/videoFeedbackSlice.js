import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videoeFeedbackList: [],
    newVideoFeedback: {},
    videoFeedback: {},
}
const videoFeedbackSlice = createSlice({
    name: 'video_feedback',
    initialState: initialState,
    reducers: {
        addVideoFeedback: (state, { payload }) => {
            state.newVideoFeedback = payload
        },
        getVideoFeedbackList: (state, { payload }) => {
            state.videoeFeedbackList = payload
        },
        getVideoFeedback: (state, { payload }) => {
            state.videoFeedback = payload
        }
    }
})

export const { addVideoFeedback, getVideoFeedbackList, getVideoFeedback } = videoFeedbackSlice.actions
export default videoFeedbackSlice.reducer