import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addMainSlider, getMainSliderList, getMainSlider, getMainSliderUrl } from '../reduxToolkit/slices/mainSliderSlice'

const PostMainSliderService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/mainslider', data, { headers: await Authorization() })
        dispatch(addMainSlider(postData.data))
        dispatch(GetMainSliderIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetMainSliderListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/mainslider?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getMainSliderList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetMainSliderIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/mainslider/${id}`, { headers: await Authorization() })
        dispatch(getMainSlider(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetMainSliderUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/mainslider/view/${url}`, { headers: await Authorization() })
        dispatch(getMainSliderUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutMainSliderService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/mainslider/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getMainSlider(response.data))
        dispatch(GetMainSliderIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteMainSliderService = (id) => async (dispatch) => {
    await axios.delete(`/api/mainslider/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getMainSlider(id))
        dispatch(GetMainSliderListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostMainSliderService, GetMainSliderListService, GetMainSliderIdService, GetMainSliderUrlService, PutMainSliderService, DeleteMainSliderService }
