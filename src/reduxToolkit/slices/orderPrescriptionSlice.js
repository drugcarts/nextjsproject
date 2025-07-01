import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderprescriptionList: [],
  newOrderprescription: {},
  userOrderprescription: [],
  orderprescriptions: {},
};
const orderprescriptionSlice = createSlice({
  name: "orderprescription",
  initialState: initialState,
  reducers: {
    addOrderprescription: (state, { payload }) => {
      state.newOrderprescription = payload;
    },
    getOrderprescriptionList: (state, { payload }) => {
      state.orderprescriptionList = payload;
    },
    getUserOrderprescription: (state, { payload }) => {
      state.userOrderprescription = payload;
    },
    getOrderprescription: (state, { payload }) => {
      state.orderprescriptions = payload;
    },
  },
});

export const {
  addOrderprescription,
  getOrderprescriptionList,
  getUserOrderprescription,
  getOrderprescription,
} = orderprescriptionSlice.actions;
export default orderprescriptionSlice.reducer;
