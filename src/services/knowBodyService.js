import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addKnowBody, getKnowBodies, getKnowBody } from '../reduxToolkit/slices/knowBodySlice'

const PostKnowBodyService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/knowbody', data, { headers: await Authorization() })
        dispatch(addKnowBody(postData.data))
        dispatch(GetKnowBodyIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetKnowBodyService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/knowbody?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getKnowBodies(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetKnowBodyIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/knowbody/${id}`, { headers: await Authorization() })
        dispatch(getKnowBody(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutKnowBodyService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/knowbody/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getKnowBody(response.data))
        dispatch(GetKnowBodyIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteKnowBodyService = (id) => async (dispatch) => {
    await axios.delete(`/api/knowbody/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getKnowBody(id))
        dispatch(GetKnowBodyService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostKnowBodyService, GetKnowBodyService, GetKnowBodyIdService, PutKnowBodyService, DeleteKnowBodyService }