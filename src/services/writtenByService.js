import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addWrittenBy, getWrittenByes, getWrittenBy } from '../reduxToolkit/slices/writtenBySlice'

const PostWrittenByService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/writtenbylist', data, { headers: await Authorization() })
        dispatch(addWrittenBy(postData.data))
        dispatch(GetWrittenByIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetWrittenByService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/writtenbylist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getWrittenByes(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetWrittenByIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/writtenbylist/${id}`, { headers: await Authorization() })
        dispatch(getWrittenBy(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutWrittenByService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/writtenbylist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getWrittenBy(response.data))
        dispatch(GetWrittenByIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteWrittenByService = (id, limit) => async (dispatch) => {
    await axios.delete(`/api/writtenbylist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getWrittenBy(id))
        dispatch(GetWrittenByService(1, limit))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostWrittenByService, GetWrittenByService, GetWrittenByIdService, PutWrittenByService, DeleteWrittenByService }