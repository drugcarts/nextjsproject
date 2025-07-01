import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addManufactuer, getManufactuers, getManufactuer,getManufactuerUrl, getManufactuerLetter } from '../reduxToolkit/slices/manufactuerSlice'

const PostManufactuerService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/manufactuerlist', data, { headers: await Authorization() })
        dispatch(addManufactuer(postData.data))
        dispatch(GetManufactuerIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetManufactuerService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/manufactuerlist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getManufactuers(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLetterManufactuerService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/manufactuerlist/first-letter?search=${search}&page=${page}&limit=${limit}`, { headers: await Authorization() })
        dispatch(getManufactuerLetter(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetManufactuerIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/manufactuerlist/${id}`, { headers: await Authorization() })
        dispatch(getManufactuer(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetManufactuerUrlService = (url) => async (dispatch) => {
  try {
    dispatch(IsLoading(true));
    const getIdData = await axios.get(
      `/api/manufactuerlist/manufacturl/${url}`,
      {
        headers: await Authorization(),
      }
    );
    dispatch(getManufactuerUrl(getIdData.data));
    dispatch(IsLoading(false));
  } catch (error) {
    dispatch(IsLoading(false));
    console.log("error", error.message);
  }
};

const PutManufactuerService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/manufactuerlist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getManufactuer(response.data))
        dispatch(GetManufactuerIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteManufactuerService = (id) => async (dispatch) => {
    await axios.delete(`/api/manufactuerlist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getManufactuer(id))
        dispatch(GetManufactuerService(1, 10))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostManufactuerService, GetManufactuerService, GetLetterManufactuerService, GetManufactuerIdService,GetManufactuerUrlService, PutManufactuerService, DeleteManufactuerService }
