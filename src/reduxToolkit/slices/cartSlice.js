import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const initialState = {
  carts: [],
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "carts",
  initialState: initialState,
  reducers: {
    getCart: (state, { payload }) => {
      state.items = payload;
    },
    addToCart: (state, action) => {
      console.log(action.payload.hasOwnProperty("userId"));
      if (action.payload.hasOwnProperty("userId") === false) {
        const existingItem = state.items.find(
          (item) => item._id === action.payload._id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        localStorage.removeItem("cart");
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1;
        }
        // else {
        //     state.items.splice(itemIndex, 1);
        // }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    mergeCartAfterLogin: (state, action) => {
      state.items = [...state.items, ...action.payload];
      localStorage.removeItem("cart");
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    setCartFromDB: (state, action) => {
      state.items = action.payload;
    },
    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const selectCartTotal = (state) =>
  state.cartData.items.reduce(
    (total, item) => total + item.saleprice * item.quantity,
    0
  );

export const selectMRPCartTotal = (state) =>
  state.cartData.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  export const selectDrugcartDiscountTotal = (state) => {
  const total = selectCartTotal(state);
  const totalMRP = selectMRPCartTotal(state);

  return totalMRP - total;
  }

export const selectTotalDiscount = (state) =>
  state.cartData.items.reduce((totalDiscount, item) => {
    const discountAmount =
      (item.saleprice * item.quantity * (item.percentage || 0)) / 100;
    return totalDiscount + discountAmount;
  }, 0);

export const selectTotalAfterDiscount = (state) => {
  const total = selectCartTotal(state);
  const totalDiscount = selectTotalDiscount(state);

  return total - totalDiscount;
};

export const selectTotalDiscountPercentage = (state) => {
  const total = selectCartTotal(state);
  const totalDiscount = selectTotalDiscount(state);

  if (total === 0) return 0;

  return (totalDiscount / total) * 100;
};

export const selectTotalSavings = (state) => selectTotalDiscount(state);

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCartFromDB,
  getCart,
  mergeCartAfterLogin,
} = cartSlice.actions;
export default cartSlice.reducer;
