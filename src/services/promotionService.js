import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addPromotion, getPromotionList, getPromotion, getPromotionUrl } from '../reduxToolkit/slices/promotionSlice'

const PostPromotionService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/promotion', data, { headers: await Authorization() })
        dispatch(addPromotion(postData.data))
        dispatch(GetPromotionIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetPromotionListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/promotion?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getPromotionList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetPromotionIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/promotion/${id}`, { headers: await Authorization() })
        dispatch(getPromotion(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetPromotionUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/promotion/view/${url}`, { headers: await Authorization() })
        dispatch(getPromotionUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutPromotionService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/promotion/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getPromotion(response.data))
        dispatch(GetPromotionIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeletePromotionService = (id) => async (dispatch) => {
    await axios.delete(`/api/promotion/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getPromotion(id))
        dispatch(GetPromotionListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostPromotionService, GetPromotionListService, GetPromotionIdService, GetPromotionUrlService, PutPromotionService, DeletePromotionService }
