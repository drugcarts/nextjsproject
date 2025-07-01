import { createUser, getUserId, getUsers, getCustomers } from '@/reduxToolkit/slices/admin/adminUserSlice';
import Authorization from '@/utils/authorization';
import axios from 'axios'
import { IsLoading, showToast } from '../../reduxToolkit/slices/commonSlice';

//admin and staff login
const AdminLoginService = (adminData, router) => async (dispatch) => {
    await axios.post('/api/adminlogin', adminData).then((response) => {
        console.log(response);
        localStorage.setItem('token', response?.data?.token);
        localStorage.setItem('role', response?.data?.role);
        router.replace(`/admin`)
    }).catch((error) => {
        console.log("error", error.message)
         dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    })
}

const CreateUserService = (adminData, router) => async (dispatch) => {
    await axios.post('/api/admin-users', adminData, { headers: await Authorization() }).then((response) => {
        console.log(response);
        // dispatch(createUser(response.data))
        dispatch(GetAllUserService())
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        // router.replace(`/admin`)
    }).catch((error) => {
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
        // alert(error?.response?.data?.error)
    })
}

const GetAllUserService = (page = 1,limit, search = "") => async (dispatch) => {
    dispatch(IsLoading(true))
    await axios.get(`/api/admin-users?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() }).then((response) => {
        dispatch(getUsers(response.data))
        console.log(response.data);
        dispatch(IsLoading(false))
    }).catch((error) => {
        console.log("error", error.message)
        dispatch(IsLoading(false))
    })
}

const DeleteUserService = (userId) => async (dispatch) => {
    await axios.delete(`/api/admin-users/${userId}`, { headers: await Authorization() }).then(() => {
        dispatch(GetAllUserService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const GetUserService = (userId) => async (dispatch) => {
    dispatch(IsLoading(true))
    await axios.get(`/api/admin-users/${userId}`, { headers: await Authorization() }).then((response) => {
        dispatch(getUserId(response.data))
        dispatch(IsLoading(false))
    }).catch((error) => {
        console.log("error", error.message)
        dispatch(IsLoading(false))
    })
}

const PutUserService = (userId, userData) => async (dispatch) => {
    await axios.put(`/api/admin-users/${userId}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getUserId(response.data))
        dispatch(GetUserService(userId))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const GetCustomersService = () => async (dispatch) => {
    await axios.get(`/api/admin-users/customers`, { headers: await Authorization() }).then((response) => {
        dispatch(getCustomers(response.data))
    }).catch((error) => {
        console.log("error", error.message)
    })
}



export { AdminLoginService, CreateUserService, GetAllUserService, GetUserService, DeleteUserService, PutUserService, GetCustomersService }