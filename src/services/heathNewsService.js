import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addhealthNews, gethealthNewes, gethealthNews, gethealthNewsUrl, getLatesthealthNews } from '../reduxToolkit/slices/healthNewsSlice'

const PostHealthNewsService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/newslist', data, { headers: await Authorization() })
        dispatch(addhealthNews(postData.data))
        dispatch(GetHealthNewsIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetLatestHealthNewsService = (page = 1, limit = 3, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/newslist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getLatesthealthNews(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHealthNewsService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/newslist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(gethealthNewes(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHealthNewsUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/newslist/health-news-details/${url}`, { headers: await Authorization() })
        dispatch(gethealthNewsUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHealthNewsIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/newslist/${id}`, { headers: await Authorization() })
        dispatch(gethealthNews(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutHealthNewsService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/newslist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(gethealthNews(response.data))
        dispatch(GetHealthNewsIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteHealthNewsService = (id) => async (dispatch) => {
    await axios.delete(`/api/newslist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(gethealthNews(id))
        dispatch(GetHealthNewsService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostHealthNewsService, GetHealthNewsService, GetHealthNewsIdService, GetHealthNewsUrlService, PutHealthNewsService, DeleteHealthNewsService, GetLatestHealthNewsService }