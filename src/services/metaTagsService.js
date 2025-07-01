import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addMetaTags, getMetaTagsList, getMetaTags, getMetaTagsUrl } from '../reduxToolkit/slices/metaTagsSlice'

const PostMetaTagsService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/metatags', data, { headers: await Authorization() })
        dispatch(addMetaTags(postData.data))
        dispatch(GetMetaTagsIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetMetaTagsListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/metatags?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getMetaTagsList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetMetaTagsIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/metatags/${id}`, { headers: await Authorization() })
        dispatch(getMetaTags(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetMetaTagsUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/metatags/metatags-view/${url}`, { headers: await Authorization(),
      next: { revalidate: 60 }, })
        dispatch(getMetaTagsUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutMetaTagsService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/metatags/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getMetaTags(response.data))
        dispatch(GetMetaTagsIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteMetaTagsService = (id) => async (dispatch) => {
    await axios.delete(`/api/metatags/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getMetaTags(id))
        dispatch(GetMetaTagsListService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostMetaTagsService, GetMetaTagsListService, GetMetaTagsIdService, PutMetaTagsService, DeleteMetaTagsService, GetMetaTagsUrlService }
