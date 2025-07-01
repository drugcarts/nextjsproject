import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addForm, getForms, getForm } from '../reduxToolkit/slices/formSlice'

const PostFormService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/form', data, { headers: await Authorization() })
        dispatch(addForm(postData.data))
        dispatch(GetFormIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetFormService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/form?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getForms(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetFormIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/form/${id}`, { headers: await Authorization() })
        dispatch(getForm(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutFormService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/form/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getForm(response.data))
        dispatch(GetFormIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteFormService = (id) => async (dispatch) => {
    await axios.delete(`/api/form/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getForm(id))
        dispatch(GetFormService(1, 10))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostFormService, GetFormService, GetFormIdService, PutFormService, DeleteFormService }