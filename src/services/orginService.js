import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addOrgin, getOrgins, getOrgin } from '../reduxToolkit/slices/orginSlice'

const PostOrginService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/orginlist', data, { headers: await Authorization() })
        dispatch(addOrgin(postData.data))
        dispatch(GetOrginIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetOrginService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/orginlist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getOrgins(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetOrginIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/orginlist/${id}`, { headers: await Authorization() })
        dispatch(getOrgin(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutOrginService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/orginlist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getOrgin(response.data))
        dispatch(GetOrginIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteOrginService = (id) => async (dispatch) => {
    await axios.delete(`/api/orginlist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getOrgin(id))
        dispatch(GetOrginService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostOrginService, GetOrginService, GetOrginIdService, PutOrginService, DeleteOrginService }