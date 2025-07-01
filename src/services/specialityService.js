import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addSpeciality, getSpecialitys, getSpeciality, getSpecialityUrl } from '../reduxToolkit/slices/specialitySlice'

const PostSpecialService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/specialtylist', data, { headers: await Authorization() })
        dispatch(addSpeciality(postData.data))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Booking Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetSpecialListService = (page = 1, limit, search = "") => async (dispatch) => {
    dispatch(IsLoading(true))
    try {
        const getData = await axios.get(`/api/specialtylist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getSpecialitys(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetSpecialIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/specialtylist/${id}`, { headers: await Authorization() })
        dispatch(getSpeciality(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetSpecialUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/specialtylist/specialist-view/${url}`, { headers: await Authorization() })
        dispatch(getSpecialityUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutSpecialService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/specialtylist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getSpeciality(response.data))
        dispatch(GetSpecialIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteSpecialService = (id) => async (dispatch) => {
    await axios.delete(`/api/specialtylist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getSpeciality(id))
        dispatch(GetSpecialListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostSpecialService, GetSpecialListService, GetSpecialIdService, GetSpecialUrlService, PutSpecialService, DeleteSpecialService }