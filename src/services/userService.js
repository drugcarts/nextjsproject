import axios from 'axios'
import { createUser, GetErrorOtp, userRegister } from '@/reduxToolkit/slices/userSlice'
import { PostCartService } from './cartService'
import { mergeCartAfterLogin } from '@/reduxToolkit/slices/cartSlice'
import { IsLoading, showToast } from '@/reduxToolkit/slices/commonSlice'

const registerService = () => async (dispatch) => {
    await axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
        dispatch(userRegister(response.data))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const PostUserService = (data) => async (dispatch) => {
    await axios.post('https://jsonplaceholder.typicode.com/posts', data).then((response) => {
        dispatch(createUser(response.data))
        dispatch(registerService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const sendOTPService = (userData, router) => async (dispatch) => {
    console.log(userData);

    const { phone, username } = userData
    await axios.post('/api/send-otp', { phone }).then((response) => {
        console.log(response);
        router.push(`/otp?username=${username}&phone=${phone}`)
    }).catch((error) => {
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
        console.log("error", error.message)
    })
}

const registerOTPService = (userData, router) => async (dispatch) => {
    console.log(userData);

    const { phone, username } = userData
    await axios.post('/api/register-otp', { phone }).then((response) => {
        console.log(response);
        router.push(`/otp?username=${username}&phone=${phone}`)
    }).catch((error) => {
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
        console.log("error", error.message)
    })
}

const verifyOTPService = (userData, router, items) => async (dispatch) => {
    dispatch(IsLoading(true))
    await axios.post('/api/verify-otp', userData).then(async (response) => {
        console.log("user data", response.data);
        localStorage.setItem('token', response?.data?.token);
        items.map((item) => {
            dispatch(PostCartService(item))
        })
        dispatch(IsLoading(false))
        dispatch(GetErrorOtp(false))
        router.push(`/`)
    }).catch((error) => {
        console.log("error", error?.response?.data?.error)
        dispatch(IsLoading(false))
        if (error?.response?.data?.error === "Invalid OTP") {
            dispatch(GetErrorOtp(true))
        }
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    })
}

export { registerService, PostUserService, sendOTPService, verifyOTPService, registerOTPService }