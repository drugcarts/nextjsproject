import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addReviewBy, getReviewByes, getReviewBy } from '../reduxToolkit/slices/reviewBySlice'

const PostReviewByService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/reviewbylist', data, { headers: await Authorization() })
        dispatch(addReviewBy(postData.data))
        dispatch(GetReviewByIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetReviewByService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/reviewbylist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getReviewByes(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetReviewByIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/reviewbylist/${id}`, { headers: await Authorization() })
        dispatch(getReviewBy(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutReviewByService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/reviewbylist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getReviewBy(response.data))
        dispatch(GetReviewByIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteReviewByService = (id, limit) => async (dispatch) => {
    await axios.delete(`/api/reviewbylist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getReviewBy(id))
        dispatch(GetReviewByService(1, limit))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostReviewByService, GetReviewByService, GetReviewByIdService, PutReviewByService, DeleteReviewByService }