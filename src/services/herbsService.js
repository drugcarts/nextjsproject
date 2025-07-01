import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addHerbs, getHerbsList, getHerbs, getHerbsUrl } from '../reduxToolkit/slices/herbsSlice'

const PostHerbsService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/herbs', data, { headers: await Authorization() })
        dispatch(addHerbs(postData.data))
        dispatch(GetHerbsIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetHerbsService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/herbs?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getHerbsList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHerbsIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/herbs/${id}`, { headers: await Authorization() })
        dispatch(getHerbs(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetHerbsUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/herbs/herbs-details/${url}`, { headers: await Authorization() })
        dispatch(getHerbsUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutHerbsService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/herbs/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getHerbs(response.data))
        dispatch(GetHerbsIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteHerbsService = (id) => async (dispatch) => {
    await axios.delete(`/api/herbs/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getHerbs(id))
        dispatch(GetHerbsService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostHerbsService, GetHerbsService, GetHerbsIdService, GetHerbsUrlService, PutHerbsService, DeleteHerbsService }