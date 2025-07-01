import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addDiseases, getDiseasesList, getDiseases, getDiseasesUrl } from '../reduxToolkit/slices/diseasesSlice'

const PostDiseasesService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/dieases', data, { headers: await Authorization() })
        dispatch(addDiseases(postData.data))
        dispatch(GetDiseasesIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetDiseasesService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/dieases?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getDiseasesList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetDiseasesIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/dieases/${id}`, { headers: await Authorization() })
        dispatch(getDiseases(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetDiseasesUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/dieases/disease-details/${url}`, { headers: await Authorization() })
        dispatch(getDiseasesUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutDiseasesService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/dieases/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getDiseases(response.data))
        dispatch(GetDiseasesIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteDiseasesService = (id) => async (dispatch) => {
    await axios.delete(`/api/dieases/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getDiseases(id))
        dispatch(GetDiseasesService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostDiseasesService, GetDiseasesService, GetDiseasesIdService, GetDiseasesUrlService, PutDiseasesService, DeleteDiseasesService }