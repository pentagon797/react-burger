import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getInfoFromServer from "../../utils/api";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "burgerIngredient/fetchBurgerIngredient",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getInfoFromServer();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
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
