import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { getLabInfoList, getLabInfoUrl } from '../reduxToolkit/slices/labInfoSlice'

const GetLabInfoListService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/lab-test-information?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getLabInfoList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetLabInfoUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/lab-test-information/view/${url}`, { headers: await Authorization() })
        dispatch(getLabInfoUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

export { GetLabInfoListService, GetLabInfoUrlService }