import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    blogList: [],
    newBlog: {},
    blog: {},
    blogUrl: {},
    blogLatest: {},
    blogTranding: {}
}
const blogSlice = createSlice({
    name: 'blog',
    initialState: initialState,
    reducers: {
        addBlog: (state, { payload }) => {
            state.newBlog = payload
        },
        getBlogs: (state, { payload }) => {
            state.blogList = payload
        },
        getBlog: (state, { payload }) => {
            state.blog = payload
        },
        getBlogUrl: (state, { payload }) => {
            state.blogUrl = payload
        },
        getBlogLatest: (state, { payload }) => {
            state.blogLatest = payload
        },
        getBlogTranding: (state, { payload }) => {
            state.blogTranding = payload
        }
    }
})

export const { addBlog, getBlogs, getBlog, getBlogUrl, getBlogLatest, getBlogTranding } = blogSlice.actions
export default blogSlice.reducer