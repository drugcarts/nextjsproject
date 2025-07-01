import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addGeneric, getGenericList, getGeneric, getGenericUrl, getGenericLetter, getGenericNameUrl } from '../reduxToolkit/slices/genericSlice'

const PostGeneticService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/generic', data, { headers: await Authorization() })
        dispatch(addGeneric(postData.data))
        dispatch(GetGeneticIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetGeneticService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/generic?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getGenericList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLetterGeneticService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/generic/first-letter?search=${search}&page=${page}&limit=${limit}`, { headers: await Authorization() })
        dispatch(getGenericLetter(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetGeneticIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/generic/${id}`, { headers: await Authorization() })
        dispatch(getGeneric(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutGeneticService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/generic/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getGeneric(response.data))
        dispatch(GetGeneticIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteGeneticService = (id) => async (dispatch) => {
    await axios.delete(`/api/generic/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getGeneric(id))
        dispatch(GetGeneticService(1, 10))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const GetGeneticUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/generic/subname?search=${url}`, { headers: await Authorization() })
        dispatch(getGenericUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetGeneticNameUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/generic/generic-view/${url}`, { headers: await Authorization() })
        dispatch(getGenericNameUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

export { PostGeneticService, GetGeneticService, GetLetterGeneticService, GetGeneticIdService, GetGeneticNameUrlService, PutGeneticService, DeleteGeneticService, GetGeneticUrlService }