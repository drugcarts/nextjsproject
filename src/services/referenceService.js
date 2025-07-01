import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addReference, getReferences, getReference } from '../reduxToolkit/slices/referenceSlice'

const PostReferenceService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/referlist', data, { headers: await Authorization() })
        dispatch(addReference(postData.data))
        dispatch(GetReferenceIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetReferenceService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/referlist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getReferences(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetReferenceIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/referlist/${id}`, { headers: await Authorization() })
        dispatch(getReference(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutReferenceService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/referlist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getReference(response.data))
        dispatch(GetReferenceIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteReferenceService = (id) => async (dispatch) => {
    await axios.delete(`/api/referlist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getReference(id))
        dispatch(GetReferenceService(1, 10))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostReferenceService, GetReferenceService, GetReferenceIdService, PutReferenceService, DeleteReferenceService }