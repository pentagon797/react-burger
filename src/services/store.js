import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "./reducers/ingredientsSlice";
import constructorSlice from "./reducers/constructorSlice";
import orderSlice from "./reducers/orderSlice";

export const store = configureStore({
  reducer: {
    burgerIngredient: ingredientSlice,
    burgerConstructor: constructorSlice,
    burgerOrder: orderSlice,
  },
});
