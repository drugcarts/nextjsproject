import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    healthVideoList: [],
    newHealthVideo: {},
    healthVideo: {},
    healthVideoUrl: {}
}

const healthVideoSlice = createSlice({
    name: 'health_video',
    initialState: initialState,
    reducers: {
        addHealthVideo: (state, { payload }) => {
            state.newHealthVideo = payload
        },
        getHealthVideos: (state, { payload }) => {
            state.healthVideoList = payload
        },
        getHealthVideo: (state, { payload }) => {
            state.healthVideo = payload
        },
        getHealthVideoUrl: (state, { payload }) => {
            state.healthVideoUrl = payload
        }
    }
})

export const { addHealthVideo, getHealthVideos, getHealthVideo, getHealthVideoUrl } = healthVideoSlice.actions
export default healthVideoSlice.reducer