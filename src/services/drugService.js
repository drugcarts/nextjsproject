import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { getServiceList, getServiceUrl } from '../reduxToolkit/slices/serviceSlice'

const GetServicesService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/service?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getServiceList(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetServiceUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/service/service-view/${url}`, { headers: await Authorization() })
        dispatch(getServiceUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

export { GetServicesService, GetServiceUrlService }