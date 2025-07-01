import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reviewByList: [],
    newReviewBy: {},
    reviewBy: {},
}
const reviewBySlice = createSlice({
    name: 'review',
    initialState: initialState,
    reducers: {
        addReviewBy: (state, { payload }) => {
            state.newReviewBy = payload
        },
        getReviewByes: (state, { payload }) => {
            state.reviewByList = payload
        },
        getReviewBy: (state, { payload }) => {
            state.reviewBy = payload
        }
    }
})

export const { addReviewBy, getReviewByes, getReviewBy } = reviewBySlice.actions
export default reviewBySlice.reducer