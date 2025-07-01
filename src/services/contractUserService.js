import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addContractUser, getContractUsers, getContractUser } from '../reduxToolkit/slices/contractUserSlice'

const PostContractUserService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/contractuser', data, { headers: await Authorization() })
        dispatch(addContractUser(postData.data))
        dispatch(GetContractUserIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetContractUserListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/contractuser?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getContractUsers(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetContractUserIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/contractuser/${id}`, { headers: await Authorization() })
        dispatch(getContractUser(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutContractUserService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/contractuser/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getContractUser(response.data))
        dispatch(GetContractUserIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteContractUserService = (id) => async (dispatch) => {
    await axios.delete(`/api/contractuser/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getContractUser(id))
        dispatch(GetContractUserListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostContractUserService, GetContractUserListService, GetContractUserIdService, PutContractUserService, DeleteContractUserService }