import { createSelector, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "./ingredientsSlice";
import { RootState } from "../store";

interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
};

const buns = (state: { burgerConstructor: IConstructorState }) => state.burgerConstructor.bun;
const items = (state: { burgerConstructor: IConstructorState }) => state.burgerConstructor.ingredients;

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addConstructorElement: (state, action) => {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
      } else {
        state.ingredients.push({ ...action.payload, id: uuidv4() });
      }
    },
    removeConstructorElement: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    sortArray: (state, action) => {
      let sorted: TIngredient[] = [];
      let start = action.payload[0];
      let end = action.payload[1];
      if (start === end) {
        return state;
      }
      if (start > end) {
        sorted = [
          ...state.ingredients.slice(0, end),
          state.ingredients[start],
          ...state.ingredients.slice(end, start),
          ...state.ingredients.slice(start + 1),
        ];
      }
      if (start < end) {
        sorted = [
          ...state.ingredients.slice(0, start),
          ...state.ingredients.slice(start + 1, end + 1),
          state.ingredients[start],
          ...state.ingredients.slice(end + 1),
        ];
      }
      return {
        bun: state.bun,
        ingredients: sorted,
      };
    },
    clearArray: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const selectCountState = createSelector(
  [items, buns, (state: RootState, id: string) => id],
  (items, buns, id) => {
    return [buns, ...items, buns].filter(
      (ingredient) => ingredient && ingredient._id === id
    ).length;
  }
);

export const {
  addConstructorElement,
  removeConstructorElement,
  sortArray,
  clearArray,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
