import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "./reducers/ingredientsSlice";
import constructorSlice from "./reducers/constructorSlice";
import orderSlice from "./reducers/orderSlice";
import rootReducer from "./reducers/rootReducer";
import burgerApi, { BurgerApi } from "../utils/burger-api";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    burgerIngredient: ingredientSlice,
    burgerConstructor: constructorSlice,
    burgerOrder: orderSlice,
    user: userSlice,
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: burgerApi,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type ThunkAPI = {
  dispatch: AppDispatch,
  extra: BurgerApi;
}