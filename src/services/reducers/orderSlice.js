import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BURGER_API_URL, request } from "../../utils/api";

const initialState = {
  orderList: null,
};

export const sendOrder = createAsyncThunk(
  "orderSlice/post",
  async (orderList, ThunkApi) => {
    const res = await request(`${BURGER_API_URL}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ ingredients: orderList }),
    });
    ThunkApi.dispatch(setOrderDetails(res));
  }
);

export const orderSliceInfo = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderList = action.payload;
    },
  },
});

export const { setOrderDetails } = orderSliceInfo.actions;

export default orderSliceInfo.reducer;
