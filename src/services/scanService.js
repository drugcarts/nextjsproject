import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addScan, getScans, getScan, getScanUrl } from '../reduxToolkit/slices/scanSlice'

const PostScanService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/scan', data, { headers: await Authorization() })
        dispatch(addScan(postData.data))
        dispatch(GetScanIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetScanListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/scan?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getScans(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetScanIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/scan/${id}`, { headers: await Authorization() })
        dispatch(getScan(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetScanUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/scan/scan-view/${url}`, { headers: await Authorization() })
        dispatch(getScanUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutScanService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/scan/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getScan(response.data))
        dispatch(GetScanIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteScanService = (id) => async (dispatch) => {
    await axios.delete(`/api/scan/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getScan(id))
        dispatch(GetScanListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostScanService, GetScanListService, GetScanIdService, GetScanUrlService, PutScanService, DeleteScanService }