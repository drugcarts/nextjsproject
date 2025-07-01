import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addArticle, getArticles, getArticle, getArticleUrl } from '../reduxToolkit/slices/articleSlice'

const PostArticleService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/articles', data, { headers: await Authorization() })
        dispatch(addArticle(postData.data))
        dispatch(GetArticleIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetArticleService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/articles?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getArticles(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetArticleIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/articles/${id}`, { headers: await Authorization() })
        dispatch(getArticle(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetArticleUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/articles/health-article-details/${url}`, { headers: await Authorization() })
        dispatch(getArticleUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutArticleService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/articles/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getArticle(response.data))
        dispatch(GetArticleIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteArticleService = (id) => async (dispatch) => {
    await axios.delete(`/api/articles/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getArticle(id))
        dispatch(GetArticleService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostArticleService, GetArticleService, GetArticleIdService, GetArticleUrlService, PutArticleService, DeleteArticleService }