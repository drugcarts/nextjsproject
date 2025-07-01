import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addPrescription, getPrescriptions, getPrescription } from '../reduxToolkit/slices/prescriptionSlice'

const PostPrescriptionService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/prescription', data, { headers: await Authorization() })
        dispatch(addPrescription(postData.data))
        dispatch(GetPrescriptionService())
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Uploaded Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        // dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetPrescriptionService = () => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/prescription`, { headers: await Authorization() })
        dispatch(getPrescriptions(getData.data))
        // dispatch(getPrescription(getData.data[0]))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetPrescriptionIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/prescription/${id}`, { headers: await Authorization() })
        dispatch(getPrescription(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutPrescriptionService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/prescription/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getPrescription(response.data))
        dispatch(GetPrescriptionIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeletePrescriptionService = (id) => async (dispatch) => {
    await axios.delete(`/api/prescription/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getPrescription(id))
        dispatch(GetPrescriptionService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostPrescriptionService, GetPrescriptionService, GetPrescriptionIdService, PutPrescriptionService, DeletePrescriptionService }