import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { getContractUser, getContractUserProducts } from '../reduxToolkit/slices/contractSlice'

const GetContractUserService = () => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/contractlist`, { headers: await Authorization() })
        dispatch(getContractUser(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetContractUserProductService = (page = 1, limit, search = "", userid) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/contractwork?page=${page}&limit=${limit}&search=${search}&id=${userid}`, { headers: await Authorization() })
        dispatch(getContractUserProducts(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

export { GetContractUserService, GetContractUserProductService }