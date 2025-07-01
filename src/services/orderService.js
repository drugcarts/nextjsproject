import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addOrder, getAllOrders, getOrder, getGetOrderData, getMyOrderData, addInvoice, getPedingOrder } from '../reduxToolkit/slices/orderSlice'
import { DeleteCartService } from "./cartService"

const PostOrderService = (data, router) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/order', data, { headers: await Authorization() })
        dispatch(addOrder(postData.data))
        // dispatch(GetOrderIdService(postData.data?._id))
        dispatch(getGetOrderData(postData.data))
        if (postData.status === 200) {
            sessionStorage.setItem('orderId', postData.data?.orderId)
            dispatch(PostInvoiceService({ to: data.shippingInfo.email, subject: "Invoice", message: JSON.stringify(postData.data) }))
            for (const item of postData.data?.orderItems || []) {
                dispatch(DeleteCartService(item?._id));
            }
        }
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Order Successfully!!!", severity: "success" }))
        router.replace('/success')
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetOrdersService = (page = 1, limit, search = "", status = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/order?page=${page}&limit=${limit}&search=${search}&orderStatus=${status}`, { headers: await Authorization() })
        dispatch(getAllOrders(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetPendingOrderService = (page = 1, limit, search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/order?page=${page}&limit=${limit}&search=${search}&orderStatus=Pending`, { headers: await Authorization() })
        dispatch(getPedingOrder(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetOrderIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/order/${id}`, { headers: await Authorization() })
        dispatch(getOrder(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetOrderOneService = (orderId) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/order/order-view/${orderId}`, { headers: await Authorization() })
        dispatch(getGetOrderData(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetMyOrderService = (orderStatus = "", startDate = "", endDate = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/order/my-orders/?orderStatus=${orderStatus}&startDate=${startDate}&endDate=${endDate}`, { headers: await Authorization() })
        dispatch(getMyOrderData(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutOrderService = (orderId, userData) => async (dispatch) => {
    await axios.put(`/api/order/order-view/${orderId}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getGetOrderData(response.data))
        dispatch(GetOrderOneService(orderId))
        dispatch(GetPendingOrderService())
        if (response.status === 200) {
            sessionStorage.clear()
        }
        // dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteOrderService = (orderId) => async (dispatch) => {
    await axios.delete(`/api/order/order-view/${orderId}`, { headers: await Authorization() }).then(() => {
        // dispatch(GetOrderOneService(orderId))
        dispatch(GetOrdersService())
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const PostInvoiceService = (data) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/mail', data, { headers: await Authorization() })
        dispatch(addInvoice(postData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

export { PostOrderService, GetOrdersService, GetOrderIdService, GetMyOrderService, PutOrderService, DeleteOrderService, GetOrderOneService, PostInvoiceService, GetPendingOrderService }