import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import {
    addDoctor,
    getDoctorList,
    getDoctor,
    getDoctorUrl,
    getDoctorNameUrl,
    addCallDoctor,
    getCallDoctorList,
    getCallDoctor,
    addAskOnline,
    getAskOnline,
    getAskOnlineList,
    getDoctorBooking,
    addDoctorBooking,
    getDoctorBookingList,
    getDoctorAppointment
} from '../reduxToolkit/slices/doctorSlice'

const PostDoctorService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/doctorlist', data, { headers: await Authorization() })
        dispatch(addDoctor(postData.data))
        dispatch(GetDoctorIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetDoctorService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/doctorlist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getDoctorList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetDoctorIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/doctorlist/${id}`, { headers: await Authorization() })
        dispatch(getDoctor(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetDoctorUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/doctorlist/specialist-url/${url}`, { headers: await Authorization() })
        dispatch(getDoctorUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetDoctorNameUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/doctorlist/doctor-name/${url}`, { headers: await Authorization() })
        dispatch(getDoctorNameUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutDoctorService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/doctorlist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getDoctor(response.data))
        dispatch(GetDoctorIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteDoctorService = (id) => async (dispatch) => {
    await axios.delete(`/api/doctorlist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getDoctor(id))
        dispatch(GetDoctorService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const PostCallDoctorService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/doctorlist/call-doctor', data, { headers: await Authorization() })
        dispatch(addCallDoctor(postData.data))
        // dispatch(GetDoctorIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Submit Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetCallDoctorListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/doctorlist/call-doctor?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getCallDoctorList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetCallDoctorIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/doctorlist/call-doctor/${id}`, { headers: await Authorization() })
        dispatch(getCallDoctor(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PostAskOnlineService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/doctorlist/ask-online', data, { headers: await Authorization() })
        dispatch(addAskOnline(postData.data))
        // dispatch(GetDoctorIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Submit Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetAskOnlineListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/doctorlist/ask-online?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getAskOnlineList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetAskOnlineIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/doctorlist/ask-online/${id}`, { headers: await Authorization() })
        dispatch(getAskOnline(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PostDoctorBookingService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/doctorlist/doctor-booking', data, { headers: await Authorization() })
        dispatch(addDoctorBooking(postData.data))
        dispatch(GetDoctorBookingIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Submit Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetDoctorBookingListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/doctorlist/doctor-booking?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getDoctorBookingList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetDoctorBookingIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/doctorlist/doctor-booking/${id}`, { headers: await Authorization() })
        dispatch(getDoctorBooking(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetMyDoctorAppointmentService = (startDate = "", endDate = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/doctorlist/doctor-booking/my-appointment/?startDate=${startDate}&endDate=${endDate}`, { headers: await Authorization() })
        dispatch(getDoctorAppointment(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

export {
    PostDoctorService,
    GetDoctorService,
    GetDoctorIdService,
    GetDoctorUrlService,
    GetDoctorNameUrlService,
    PutDoctorService,
    DeleteDoctorService,
    PostCallDoctorService,
    GetCallDoctorListService,
    GetCallDoctorIdService,
    PostAskOnlineService,
    GetAskOnlineListService,
    GetAskOnlineIdService,
    PostDoctorBookingService,
    GetDoctorBookingListService,
    GetDoctorBookingIdService,
    GetMyDoctorAppointmentService
}