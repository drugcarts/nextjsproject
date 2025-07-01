import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addTestPackage, getTestPackages, getTestPackage, getTestPackageUrl, getTestUrl } from '../reduxToolkit/slices/tastPackageSlice'

const PostTestPackageService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/test-package', data, { headers: await Authorization() })
        dispatch(addTestPackage(postData.data))
        dispatch(GetTestPackageIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetTestPackagesService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/test-package?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getTestPackages(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetTestPackageIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/test-package/${id}`, { headers: await Authorization() })
        dispatch(getTestPackage(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetTestPackageUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/test-package/package/${url}`, { headers: await Authorization() })
        dispatch(getTestPackageUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetTestUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/test-package/test/${url}`, { headers: await Authorization() })
        dispatch(getTestUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutTestPackageService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/test-package/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getTestPackage(response.data))
        dispatch(GetTestPackageIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteTestPackageService = (id) => async (dispatch) => {
    await axios.delete(`/api/test-package/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getTestPackage(id))
        dispatch(GetTestPackagesService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostTestPackageService, GetTestPackagesService, GetTestPackageIdService, GetTestPackageUrlService, GetTestUrlService, PutTestPackageService, DeleteTestPackageService }