import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideeffects: [],
  newSideeffect: {},
  sideeffect: {},
  sideeffectGeneric: {},
};
const sideeffectSlice = createSlice({
  name: "sideeffect",
  initialState: initialState,
  reducers: {
    addSideeffect: (state, { payload }) => {
      state.newSideeffect = payload;
    },
    getSideeffects: (state, { payload }) => {
      state.sideeffects = payload;
    },
    getSideeffect: (state, { payload }) => {
      state.sideeffect = payload;
    },
    getSideeffectGeneric: (state, { payload }) => {
      state.sideeffectGeneric = payload;
    },
  },
});

export const {
  addSideeffect,
  getSideeffects,
  getSideeffect,
  getSideeffectGeneric,
} = sideeffectSlice.actions;
export default sideeffectSlice.reducer;
