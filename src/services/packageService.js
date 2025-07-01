import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addPackage, getPackages, getPackage,getPackageId } from '../reduxToolkit/slices/packageSlice'

const PostPackageService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/packagelist', data, { headers: await Authorization() })
        dispatch(addPackage(postData.data))
        dispatch(GetPackageIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetPackageService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/packagelist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getPackages(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetPackageIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/packagelist/${id}`, { headers: await Authorization() })
        dispatch(getPackage(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetAddPackageIdService = (packid) => async (dispatch) => {
  try {
    dispatch(IsLoading(true));
    const getIdData = await axios.get(`/api/packagelist/packid/${packid}`, {
      headers: await Authorization(),
    });
    dispatch(getPackageId(getIdData.data));
    dispatch(IsLoading(false));
  } catch (error) {
    dispatch(IsLoading(false));
    console.log("error", error.message);
  }
};

const PutPackageService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/packagelist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getPackage(response.data))
        dispatch(GetPackageIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeletePackageService = (id) => async (dispatch) => {
    await axios.delete(`/api/packagelist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getPackage(id))
     dispatch(GetPackageService(1, 10))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostPackageService, GetPackageService, GetPackageIdService,GetAddPackageIdService, PutPackageService, DeletePackageService }
