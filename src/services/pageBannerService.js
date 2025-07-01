import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addPageBanner, getPageBannerList, getPageBanner, getPageBannerUrl } from '../reduxToolkit/slices/pageBannerSlice'

const PostPageBannerService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/pagebannerlist', data, { headers: await Authorization() })
        dispatch(addPageBanner(postData.data))
        dispatch(GetPageBannerIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetPageBannerListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/pagebannerlist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getPageBannerList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetPageBannerIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/pagebannerlist/${id}`, { headers: await Authorization() })
        dispatch(getPageBanner(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetPageBannerUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/pagebannerlist/view/${url}`, { headers: await Authorization() })
        dispatch(getPageBannerUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutPageBannerService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/pagebannerlist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getPageBanner(response.data))
        dispatch(GetPageBannerIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeletePageBannerService = (id) => async (dispatch) => {
    await axios.delete(`/api/pagebannerlist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getPageBanner(id))
        dispatch(GetPageBannerListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostPageBannerService, GetPageBannerListService, GetPageBannerIdService, GetPageBannerUrlService, PutPageBannerService, DeletePageBannerService }
