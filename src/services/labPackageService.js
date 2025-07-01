import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addLabPackage, getLabPackages, getLabPackage, getLabPackageUrl } from '../reduxToolkit/slices/labPackageSlice'

const PostLabPackageService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/lab-package', data, { headers: await Authorization() })
        dispatch(addLabPackage(postData.data))
        dispatch(GetLabPackageIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetLabPackagesService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/lab-package?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getLabPackages(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLabPackageIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/lab-package/${id}`, { headers: await Authorization() })
        dispatch(getLabPackage(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLabPackageUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/lab-package/package/${url}`, { headers: await Authorization() })
        dispatch(getLabPackageUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutLabPackageService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/lab-package/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getLabPackage(response.data))
        dispatch(GetLabPackageIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteLabPackageService = (id) => async (dispatch) => {
    await axios.delete(`/api/lab-package/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getLabPackage(id))
        dispatch(GetLabPackagesService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostLabPackageService, GetLabPackagesService, GetLabPackageIdService, GetLabPackageUrlService, PutLabPackageService, DeleteLabPackageService }