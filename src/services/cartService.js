import axios from 'axios'
import Authorization from '../utils/authorization'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import { addToCart, getCart, incrementQuantity, decrementQuantity, removeFromCart } from '../reduxToolkit/slices/cartSlice'

const getCartService = () => async (dispatch) => {
    await axios.get('/api/cart', { headers: await Authorization() }).then((response) => {
        dispatch(getCart(response.data))
        // localStorage.setItem('cart', cart);
        console.log(response.data);

    }).catch((error) => {
        console.log("error", error.message)
    })
}

const PostCartService = (data) => async (dispatch) => {
  dispatch(IsLoading(true));

  try {
    dispatch(addToCart(data));
    dispatch(showToast({ message: "Cart added successfully!", severity: "success" }));

    const headers = await Authorization();
    const response = await axios.post("/api/cart", data, { headers });

    dispatch(addToCart(response.data));
    dispatch(getCartService());
  } catch (error) {
    console.error("PostCartService error:", error.message);
    dispatch(getCartService());

    if (error?.response?.data?.error !== "Unauthorized") {
      localStorage.removeItem("cart");
    }
    // dispatch(showToast({
    //   message: error?.response?.data?.error || "Failed to add to cart",
    //   severity: "error",
    // }));
  } finally {
    dispatch(IsLoading(false));
  }
};

const CartIncrementService = (id, userData) => async (dispatch) => {
    dispatch(incrementQuantity(id))
    await axios.put(`/api/cart/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getCartService())
        localStorage.removeItem('cart')
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const CartDecrementService = (id, userData) => async (dispatch) => {
    dispatch(decrementQuantity(id))
    await axios.put(`/api/cart/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getCartService())
        localStorage.removeItem('cart')
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const DeleteCartService = (id) => async (dispatch) => {
    dispatch(removeFromCart(id))
    await axios.delete(`/api/cart/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getCartService())
        localStorage.removeItem('cart')
    }).catch((error) => {
        console.log("error", error.message)
    })
}

export { getCartService, PostCartService, CartIncrementService, CartDecrementService, DeleteCartService }