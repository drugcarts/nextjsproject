import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addInfoGraphics, getInfoGraphicsList, getInfoGraphics, getInfoGraphicsUrl } from '../reduxToolkit/slices/infoGraphicsSlice'

const PostInfoGraphicsService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/infographics', data, { headers: await Authorization() })
        dispatch(addInfoGraphics(postData.data))
        dispatch(GetInfoGraphicsIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetInfoGraphicsService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/infographics?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getInfoGraphicsList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetInfoGraphicsIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/infographics/${id}`, { headers: await Authorization() })
        dispatch(getInfoGraphics(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetInfoGraphicsUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/infographics/infographics-view/${url}`, { headers: await Authorization() })
        dispatch(getInfoGraphicsUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutInfoGraphicsService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/infographics/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getInfoGraphics(response.data))
        dispatch(GetInfoGraphicsIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteInfoGraphicsService = (id) => async (dispatch) => {
    await axios.delete(`/api/infographics/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getInfoGraphics(id))
        dispatch(GetInfoGraphicsService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostInfoGraphicsService, GetInfoGraphicsService, GetInfoGraphicsIdService, GetInfoGraphicsUrlService, PutInfoGraphicsService, DeleteInfoGraphicsService }