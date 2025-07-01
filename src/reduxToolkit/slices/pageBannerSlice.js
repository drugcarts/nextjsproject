import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pageBannerList: [],
    newPageBanner: {},
    pageBanner: {},
    pageBannerUrl: {}
}
const pageBannerSlice = createSlice({
    name: 'page_banner',
    initialState: initialState,
    reducers: {
        addPageBanner: (state, { payload }) => {
            state.newPageBanner = payload
        },
        getPageBannerList: (state, { payload }) => {
            state.pageBannerList = payload
        },
        getPageBanner: (state, { payload }) => {
            state.pageBanner = payload
        },
        getPageBannerUrl: (state, { payload }) => {
            state.pageBannerUrl = payload
        },
    }
})

export const { addPageBanner, getPageBannerList, getPageBanner, getPageBannerUrl } = pageBannerSlice.actions
export default pageBannerSlice.reducer