import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    articleList: [],
    newArticle: {},
    article: {},
    articleUrl: {},
}
const articleSlice = createSlice({
    name: 'articles',
    initialState: initialState,
    reducers: {
        addArticle: (state, { payload }) => {
            state.newArticle = payload
        },
        getArticles: (state, { payload }) => {
            state.articleList = payload
        },
        getArticle: (state, { payload }) => {
            state.article = payload
        },
        getArticleUrl: (state, { payload }) => {
            state.articleUrl = payload
        }
    }
})

export const { addArticle, getArticles, getArticle, getArticleUrl } = articleSlice.actions
export default articleSlice.reducer