import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "./reducers/ingredientsSlice";
import constructorSlice from "./reducers/constructorSlice";
import orderSlice from "./reducers/orderSlice";
import rootReducer from "./reducers/rootReducer";
import burgerApi from "../utils/burger-api";

export const store = configureStore({
  reducer: {
    burgerIngredient: ingredientSlice,
    burgerConstructor: constructorSlice,
    burgerOrder: orderSlice,
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: burgerApi,
      },
    }),
});
