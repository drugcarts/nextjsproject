import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addServiceQuiry, getServiceQuirys, getServiceQuiry } from '../reduxToolkit/slices/serviceenquirySlice'

const PostServiceQuiryService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/serviceenquiry', data, { headers: await Authorization() })
        dispatch(addServiceQuiry(postData.data))
        // dispatch(GetReviewByIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetServiceQuirysService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/serviceenquiry?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getServiceQuirys(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}


export { PostServiceQuiryService, GetServiceQuirysService }