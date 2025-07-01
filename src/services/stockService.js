import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addStock, getStocks, getStock } from '../reduxToolkit/slices/stockSlice'

const PostStockService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/stocklist', data, { headers: await Authorization() })
        dispatch(addStock(postData.data))
        dispatch(GetStockIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetStockService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/stocklist?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getStocks(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetStockIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/stocklist/${id}`, { headers: await Authorization() })
        dispatch(getStock(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutStockService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/stocklist/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getStock(response.data))
        dispatch(GetStockIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteStockService = (id) => async (dispatch) => {
    await axios.delete(`/api/stocklist/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getStock(id))
        dispatch(GetStockService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { PostStockService, GetStockService, GetStockIdService, PutStockService, DeleteStockService }