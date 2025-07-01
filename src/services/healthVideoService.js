import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addHealthVideo, getHealthVideos, getHealthVideo, getHealthVideoUrl } from '../reduxToolkit/slices/healthVideoSlice'

const PostHealthVideoService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/health-video', data, { headers: await Authorization() })
        dispatch(addHealthVideo(postData.data))
        dispatch(GetHealthVideoIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetHealthVideosService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/health-video?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getHealthVideos(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHealthVideoIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/health-video/${id}`, { headers: await Authorization() })
        dispatch(getHealthVideo(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHealthVideoUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/health-video/health-video-detail/${url}`, { headers: await Authorization() })
        dispatch(getHealthVideoUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutHealthVideoService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/health-video/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getHealthVideo(response.data))
        dispatch(GetHealthVideoIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteHealthVideoService = (id) => async (dispatch) => {
    await axios.delete(`/api/health-video/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getHealthVideo(id))
        dispatch(GetHealthVideosService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostHealthVideoService, GetHealthVideosService, GetHealthVideoIdService, GetHealthVideoUrlService, PutHealthVideoService, DeleteHealthVideoService }