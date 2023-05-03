import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BURGER_API_URL, request } from "../../utils/burger-api";
import { ThunkAPI } from "../store";
import { getCookie } from "../../utils/cookie";

type TServerResponse = {
  success: boolean,
  name: string,
  order: {
    number: number,
  }
}

export interface IOrderState {
  order: TServerResponse | null;
  isLoading: boolean;
  serverResponse: null | {
    success: boolean;
    name: string;
    order: {
      number: number;
    };
  }
}

export const initialState: IOrderState = {
  order: null,
  isLoading: false,
  serverResponse: null
};

export const sendOrder = createAsyncThunk<TServerResponse, string[], ThunkAPI>(
  "orderSlice/post",
  async (orderList, ThunkApi) => {
    const res = await request<TServerResponse>(`${BURGER_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        authorization: getCookie('accessToken')
      } as HeadersInit,
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
    setOrderDetails: (state, action: PayloadAction<TServerResponse>) => {
      state.order = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.order = action.payload;
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
