import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addCountryCode, getCountryCodes, getCountryCode } from '../reduxToolkit/slices/CountryCodeSlice'

const PostCountryCodeService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/country_code_list', data, { headers: await Authorization() })
        dispatch(addCountryCode(postData.data))
        dispatch(GetCountryCodeIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetCountryCodeService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/country_code_list?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getCountryCodes(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetCountryCodeIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/country_code_list/${id}`, { headers: await Authorization() })
        dispatch(getCountryCode(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutCountryCodeService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/country_code_list/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getCountryCode(response.data))
        dispatch(GetCountryCodeIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteCountryCodeService = (id) => async (dispatch) => {
    await axios.delete(`/api/country_code_list/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getCountryCode(id))
        dispatch(GetCountryCodeService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostCountryCodeService, GetCountryCodeService, GetCountryCodeIdService, PutCountryCodeService, DeleteCountryCodeService }