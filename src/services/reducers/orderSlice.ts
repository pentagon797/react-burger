import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BURGER_API_URL, request } from "../../utils/burger-api";

interface IOrderState {
  orderList: string[] | null;
  isLoading: boolean;
  serverResponse: null | {
    "success"?: boolean,
    "name"?: string,
    "order"?: {
      "number"?: number,
    }
  }
}
const initialState: IOrderState = {
  orderList: null,
  isLoading: false,
  serverResponse: null
};

export const sendOrder = createAsyncThunk(
  "orderSlice/post",
  async (orderList: any, ThunkApi) => {
    const res = await request(`${BURGER_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ ingredients: orderList }),
    });
    ThunkApi.dispatch(setOrderDetails(res));
    return res;
  }
);

export const orderSliceInfo = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<string[]>) => {
      state.orderList = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrder.fulfilled, (state, action: PayloadAction<object>) => {
        state.serverResponse = action.payload;
        state.isLoading = false;
      })
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setOrderDetails } = orderSliceInfo.actions;

export default orderSliceInfo.reducer;
