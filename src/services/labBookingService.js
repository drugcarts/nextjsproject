import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addLabBooking, getLabBookings, getLabBooking, getMyLabBooking } from '../reduxToolkit/slices/labBookingSlice'

const PostLabBookingService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/lab-booking', data, { headers: await Authorization() })
        dispatch(addLabBooking(postData.data))
        // dispatch(GetLabBookingIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetLabBookingsService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/lab-booking?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getLabBookings(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLabBookingIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/lab-booking/${id}`, { headers: await Authorization() })
        dispatch(getLabBooking(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetMyLabBookingService = (startDate = "", endDate = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/lab-booking/my-booking/?startDate=${startDate}&endDate=${endDate}`, { headers: await Authorization() })
        dispatch(getMyLabBooking(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}


const DeleteLabBookingService = (id) => async (dispatch) => {
    await axios.delete(`/api/lab-booking/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getLabBooking(id))
        dispatch(GetLabBookingsService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostLabBookingService, GetLabBookingsService, GetLabBookingIdService, GetMyLabBookingService, DeleteLabBookingService }