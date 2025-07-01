import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addhealthTip, gethealthTips, gethealthTip, gethealthTipUrl } from '../reduxToolkit/slices/healthTipSlice'

const PostHealthTipService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/healthtips', data, { headers: await Authorization() })
        dispatch(addhealthTip(postData.data))
        dispatch(GetHealthTipIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetHealthTipService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/healthtips?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(gethealthTips(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHealthTipIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/healthtips/${id}`, { headers: await Authorization() })
        dispatch(gethealthTip(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHealthTipUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/healthtips/daily-health-tips-details/${url}`, { headers: await Authorization() })
        dispatch(gethealthTipUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutHealthTipService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/healthtips/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(gethealthTip(response.data))
        dispatch(GetHealthTipIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteHealthTipService = (id) => async (dispatch) => {
    await axios.delete(`/api/healthtips/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(gethealthTip(id))
        dispatch(GetHealthTipService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostHealthTipService, GetHealthTipService, GetHealthTipIdService, GetHealthTipUrlService, PutHealthTipService, DeleteHealthTipService }