import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addLab, getLabs, getLab } from '../reduxToolkit/slices/labSlice'

const PostLabService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/lab', data, { headers: await Authorization() })
        dispatch(addLab(postData.data))
        dispatch(GetLabIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetLabsService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/lab?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getLabs(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLabIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/lab/${id}`, { headers: await Authorization() })
        dispatch(getLab(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutLabService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/lab/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getLab(response.data))
        dispatch(GetLabIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteLabService = (id) => async (dispatch) => {
    await axios.delete(`/api/lab/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getLab(id))
        dispatch(GetLabsService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostLabService, GetLabsService, GetLabIdService, PutLabService, DeleteLabService }