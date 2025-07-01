import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addBooking, getBookings, getBooking, emailBooking } from '../reduxToolkit/slices/scanBookingSlice'

const PostScanBookingService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/scan-booking', data, { headers: await Authorization() })
        dispatch(addBooking(postData.data))
        if (postData.status === 200) {
        dispatch(EmailScanBookingService({ to: postData.data?.email, subject: "DrugCart Scan Booking #" + postData.data?.bookingId, message: JSON.stringify(postData.data) }))
        }
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Booking Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetScanBookingListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/scan-booking?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getBookings(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetScanBookingIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/scan-booking/${id}`, { headers: await Authorization() })
        dispatch(getBooking(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const DeleteScanBookingService = (id) => async (dispatch) => {
    await axios.delete(`/api/scan-booking/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getBooking(id))
        dispatch(GetScanBookingListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const EmailScanBookingService = (data) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/scan-booking/send-mail', data, { headers: await Authorization() })
        dispatch(emailBooking(postData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

export { PostScanBookingService, GetScanBookingListService, GetScanBookingIdService, DeleteScanBookingService, EmailScanBookingService }