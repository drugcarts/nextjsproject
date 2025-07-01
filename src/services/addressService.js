import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addAddress, getAddressList, getAddress, getUserAddress } from '../reduxToolkit/slices/addressSlice'

const PostAddressService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/address', data, { headers: await Authorization() })
        dispatch(addAddress(postData.data))
        dispatch(getAddress(postData.data))
        dispatch(GetAddressIdService(postData.data?.cus_id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetAddressService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/address?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getAddressList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetAddressIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/address/${id}`, { headers: await Authorization() })
        dispatch(getUserAddress(getIdData.data))
        dispatch(getAddress(getIdData.data[0]))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetUserAddressIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/address/user-address/${id}`, { headers: await Authorization() })
        dispatch(getAddress(getIdData.data))
        console.log(getIdData.data);
        
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutAddressService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/address/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getAddress(response.data))
        dispatch(GetAddressIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteAddressService = (id) => async (dispatch) => {
    await axios.delete(`/api/address/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getAddress(id))
        // dispatch(GetAddressService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostAddressService, GetAddressService, GetAddressIdService, GetUserAddressIdService, PutAddressService, DeleteAddressService }