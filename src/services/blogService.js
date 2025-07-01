import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addBlog, getBlogs, getBlog, getBlogUrl, getBlogLatest, getBlogTranding } from '../reduxToolkit/slices/blogSlice'

const PostBlogService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/blog', data, { headers: await Authorization() })
        dispatch(addBlog(postData.data))
        dispatch(GetBlogIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetBlogService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/blog?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getBlogs(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetBlogUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/blog/blog-details/${url}`, { headers: await Authorization() })
        dispatch(getBlogUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetBlogIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/blog/${id}`, { headers: await Authorization() })
        dispatch(getBlog(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutBlogService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/blog/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getBlog(response.data))
        dispatch(GetBlogIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteBlogService = (id) => async (dispatch) => {
    await axios.delete(`/api/blog/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getBlog(id))
        dispatch(GetBlogService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const GetLatestBlogService = (page = 1, limit = 3, search = "", type ="Latest") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/blog?page=${page}&limit=${limit}&search=${search}&blogtype=${type}`, { headers: await Authorization() })
        dispatch(getBlogLatest(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetTrandingBlogService = (page = 1, limit = 3, search = "", type ="Tranding") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/blog?page=${page}&limit=${limit}&search=${search}&blogtype=${type}`, { headers: await Authorization() })
        dispatch(getBlogTranding(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

export { PostBlogService, GetBlogService, GetBlogIdService, GetBlogUrlService, PutBlogService, DeleteBlogService, GetLatestBlogService, GetTrandingBlogService }