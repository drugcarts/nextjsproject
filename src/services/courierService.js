import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addCourier, getCouriers, getCourier } from '../reduxToolkit/slices/courierSlice'

const PostCourierService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/courierlist', data, { headers: await Authorization() })
        dispatch(addCourier(postData.data))
        dispatch(GetCourierIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetCourierService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/courierlist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getCouriers(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetCourierIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/courierlist/${id}`, { headers: await Authorization() })
        dispatch(getCourier(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutCourierService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/courierlist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getCourier(response.data))
        dispatch(GetCourierIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteCourierService = (id) => async (dispatch) => {
    await axios.delete(`/api/courierlist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getCourier(id))
        dispatch(GetCourierService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostCourierService, GetCourierService, GetCourierIdService, PutCourierService, DeleteCourierService }