import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mainSliderList: [],
    newMainSlider: {},
    mainSlider: {},
    mainSliderUrl: []
}
const mainSliderSlice = createSlice({
    name: 'main_slider',
    initialState: initialState,
    reducers: {
        addMainSlider: (state, { payload }) => {
            state.newMainSlider = payload
        },
        getMainSliderList: (state, { payload }) => {
            state.mainSliderList = payload
        },
        getMainSlider: (state, { payload }) => {
            state.mainSlider = payload
        },
        getMainSliderUrl: (state, { payload }) => {
            state.mainSliderUrl = payload
        },
    }
})

export const { addMainSlider, getMainSliderList, getMainSlider, getMainSliderUrl } = mainSliderSlice.actions
export default mainSliderSlice.reducer