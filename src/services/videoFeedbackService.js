import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addVideoFeedback, getVideoFeedbackList, getVideoFeedback } from '../reduxToolkit/slices/videoFeedbackSlice'

const PostVideoFeedbackService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/video-feedback', data, { headers: await Authorization() })
        dispatch(addVideoFeedback(postData.data))
        dispatch(GetVideoFeedbackIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Submitted Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetVideoFeedbackListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/video-feedback?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getVideoFeedbackList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetVideoFeedbackIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/video-feedback/${id}`, { headers: await Authorization() })
        dispatch(getVideoFeedback(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutVideoFeedbackService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/video-feedback/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getVideoFeedback(response.data))
        dispatch(GetVideoFeedbackIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteVideoFeedbackService = (id) => async (dispatch) => {
    await axios.delete(`/api/video-feedback/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getVideoFeedback(id))
        dispatch(GetVideoFeedbackListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostVideoFeedbackService, GetVideoFeedbackListService, GetVideoFeedbackIdService, PutVideoFeedbackService, DeleteVideoFeedbackService }