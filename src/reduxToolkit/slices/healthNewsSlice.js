import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    healthNewsList: [],
    newHealthNews: {},
    healthNews: {},
    healthNewsUrl: {},
    healthLatestNews: {},
}
const healthNewsSlice = createSlice({
    name: 'tips',
    initialState: initialState,
    reducers: {
        addhealthNews: (state, { payload }) => {
            state.newHealthNews = payload
        },
        gethealthNewes: (state, { payload }) => {
            state.healthNewsList = payload
        },
        gethealthNews: (state, { payload }) => {
            state.healthNews = payload
        },
        gethealthNewsUrl: (state, { payload }) => {
            state.healthNewsUrl = payload
        },
        getLatesthealthNews: (state, { payload }) => {
            state.healthLatestNews = payload
        },
    }
})

export const { addhealthNews, gethealthNewes, gethealthNews, gethealthNewsUrl, getLatesthealthNews } = healthNewsSlice.actions
export default healthNewsSlice.reducer