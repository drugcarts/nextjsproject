import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addTextFeedback, getTextFeedbackList, getTextFeedback } from '../reduxToolkit/slices/textFeedbackSlice'

const PostTextFeedbackService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/text-feedback', data, { headers: await Authorization() })
        dispatch(addTextFeedback(postData.data))
        dispatch(GetTextFeedbackIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Submitted Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetTextFeedbackListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/text-feedback?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getTextFeedbackList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetTextFeedbackIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/text-feedback/${id}`, { headers: await Authorization() })
        dispatch(getTextFeedback(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutTextFeedbackService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/text-feedback/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getTextFeedback(response.data))
        dispatch(GetTextFeedbackIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteTextFeedbackService = (id) => async (dispatch) => {
    await axios.delete(`/api/text-feedback/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getTextFeedback(id))
        dispatch(GetTextFeedbackListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostTextFeedbackService, GetTextFeedbackListService, GetTextFeedbackIdService, PutTextFeedbackService, DeleteTextFeedbackService }