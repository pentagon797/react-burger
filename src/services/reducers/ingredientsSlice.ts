import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getInfoFromServer } from "../../utils/burger-api";

export type TIngredient = {
  __v: number,
  _id: string,
  name: string,
  price: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  image: string,
  image_mobile: string,
  image_large: string,
  type: string,
  id?: string,
  uuid?: string | undefined,
}

interface IIngredientState {
  data: TIngredient[];
  isLoading: boolean;
  error: string | unknown | null;
}

const initialState: IIngredientState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  getInfoFromServer
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ingredientsSlice.reducer;

