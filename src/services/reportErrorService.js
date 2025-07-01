import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addReportError, getReportErrors, getReportError } from '../reduxToolkit/slices/reportErrorSlice'

const PostReportErrorService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/report-error', data, { headers: await Authorization() })
        dispatch(addReportError(postData.data))
        dispatch(GetReportErrorIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Report sent Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetReportErrorsService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/report-error?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getReportErrors(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetReportErrorIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/report-error/${id}`, { headers: await Authorization() })
        dispatch(getReportError(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const DeleteReportErrorService = (id) => async (dispatch) => {
    await axios.delete(`/api/report-error/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getReportError(id))
        dispatch(GetReportErrorsService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostReportErrorService, GetReportErrorsService, GetReportErrorIdService, DeleteReportErrorService }