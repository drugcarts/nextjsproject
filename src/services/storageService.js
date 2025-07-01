import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addStorage, getStorages, getStorage,getStorageId } from '../reduxToolkit/slices/storageSlice'

const PostStorageService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/storage', data, { headers: await Authorization() })
        dispatch(addStorage(postData.data))
        dispatch(GetStorageIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetStorageService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/storage?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getStorages(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetStorageIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/storage/${id}`, { headers: await Authorization() })
        dispatch(getStorage(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetAddStorageIdService = (storageid) => async (dispatch) => {
  try {
    dispatch(IsLoading(true));
    const getIdData = await axios.get(`/api/storage/storageid/${storageid}`, {
      headers: await Authorization(),
    });
    dispatch(getStorageId(getIdData.data));
    dispatch(IsLoading(false));
  } catch (error) {
    dispatch(IsLoading(false));
    console.log("error", error.message);
  }
};

const PutStorageService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/storage/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getStorage(response.data))
        dispatch(GetStorageIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteStorageService = (id, limit) => async (dispatch) => {
    await axios.delete(`/api/storage/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getStorage(id))
        dispatch(GetStorageService(1, limit))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostStorageService, GetStorageService, GetStorageIdService, GetAddStorageIdService, PutStorageService, DeleteStorageService }
