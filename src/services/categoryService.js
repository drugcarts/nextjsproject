import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addCategory, getCategories, getCategory, getCategoryLetter, getNonCategory } from '../reduxToolkit/slices/categorySlice'

const PostCategoryService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/category', data, { headers: await Authorization() })
        dispatch(addCategory(postData.data))
        dispatch(GetCategoryIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
        return { success: true, data: postData.data };
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
        return { success: false, error: error?.response?.data?.error };
    }
}

const GetCategoryService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/category?page=${page}&limit=${limit}&search=${search}&cat_type=prescriptions`, { headers: await Authorization() })
        dispatch(getCategories(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetNonCategoryService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/category?page=${page}&limit=${limit}&search=${search}&cat_type=non-prescriptions`, { headers: await Authorization() })
        dispatch(getNonCategory(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLetterCategoryService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/category/first-letter?search=${search}&page=${page}&limit=${limit}&cat_type=prescriptions`, { headers: await Authorization() })
        dispatch(getCategoryLetter(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetCategoryIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/category/${id}`, { headers: await Authorization() })
        dispatch(getCategory(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutCategoryService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/category/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getCategory(response.data))
        dispatch(GetCategoryIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteCategoryService = (id) => async (dispatch) => {
    await axios.delete(`/api/category/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getCategory(id))
        dispatch(GetCategoryService(1, 10))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostCategoryService, GetCategoryService, GetLetterCategoryService, GetNonCategoryService, GetCategoryIdService, PutCategoryService, DeleteCategoryService }