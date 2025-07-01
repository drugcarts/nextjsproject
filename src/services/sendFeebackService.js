import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addSendFeedback, getSendFeedbackList, getSendFeedback } from '../reduxToolkit/slices/sendFeedbackSlice'

const PostSendFeedbackService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/send-feedback', data, { headers: await Authorization() })
        dispatch(addSendFeedback(postData.data))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Feedback Sent Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetSendFeedbackListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/send-feedback?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getSendFeedbackList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetSendFeedbackIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/send-feedback/${id}`, { headers: await Authorization() })
        dispatch(getSendFeedback(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const DeleteSendFeedbackService = (id) => async (dispatch) => {
    await axios.delete(`/api/send-feedback/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getSendFeedback(id))
        dispatch(GetSendFeedbackListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostSendFeedbackService, GetSendFeedbackListService, GetSendFeedbackIdService, DeleteSendFeedbackService }