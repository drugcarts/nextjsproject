import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    metaTagsList: [],
    newMetatags: {},
    metatags: {},
    metatagsUrl: {}
}
const metaTagsSlice = createSlice({
    name: 'metatags',
    initialState: initialState,
    reducers: {
        addMetaTags: (state, { payload }) => {
            state.newMetatags = payload
        },
        getMetaTagsList: (state, { payload }) => {
            state.metaTagsList = payload
        },
        getMetaTags: (state, { payload }) => {
            state.metatags = payload
        },
        getMetaTagsUrl: (state, { payload }) => {
            state.metatagsUrl = payload
        }
    }
})

export const { addMetaTags, getMetaTagsList, getMetaTags, getMetaTagsUrl } = metaTagsSlice.actions
export default metaTagsSlice.reducer