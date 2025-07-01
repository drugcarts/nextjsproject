import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addSubCategory, getSubCategories, getSubCategory,getSubCateUrl, getSubCategoryUrl } from '../reduxToolkit/slices/subCategorySlice'

const PostSubCategoryService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/sub-category', data, { headers: await Authorization() })
        dispatch(addSubCategory(postData.data))
        dispatch(GetSubCategoryService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetSubCategoryService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/sub-category?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getSubCategories(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetSubCategoryIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/sub-category/${id}`, { headers: await Authorization() })
        dispatch(getSubCategory(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetSubCateUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/sub-category/subcategory/${url}`, { headers: await Authorization() })
        dispatch(getSubCateUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutSubCategoryService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/sub-category/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getSubCategory(response.data))
        dispatch(GetSubCategoryIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteSubCategoryService = (id) => async (dispatch) => {
    await axios.delete(`/api/sub-category/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getSubCategory(id))
        dispatch(GetSubCategoryService(1, 10))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const GetSubCategoryUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/sub-category/catname/${url}`, { headers: await Authorization() })
        dispatch(getSubCategoryUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

export { PostSubCategoryService, GetSubCategoryService, GetSubCategoryIdService,GetSubCateUrlService, PutSubCategoryService, DeleteSubCategoryService, GetSubCategoryUrlService }