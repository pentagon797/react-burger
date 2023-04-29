import { configureStore } from "@reduxjs/toolkit";
import ingredientSlice from "./reducers/ingredientsSlice";
import constructorSlice from "./reducers/constructorSlice";
import orderSlice from "./reducers/orderSlice";
import rootReducer from "./reducers/rootReducer";
import burgerApi, { BurgerApi } from "../utils/burger-api";
import userSlice from "./reducers/userSlice";
import {
  wsCloseFeed,
  wsConnectFeed,
  wsConnectingFeed,
  wsDisconnectFeed,
  wsErrorFeed,
  wsMessageFeed,
  wsOpenFeed,
  wsCloseOrder,
  wsConnectOrder,
  wsConnectingOrder,
  wsDisconnectOrder,
  wsErrorOrder,
  wsMessageOrder,
  wsOpenOrder
} from './actions/feed';
import { socketMiddleware } from "./middleware/middleware";

const wsActionsFeed = {
  wsConnect: wsConnectFeed,
  wsDisconnect: wsDisconnectFeed,
  wsConnecting: wsConnectingFeed,
  wsOpen: wsOpenFeed,
  wsClose: wsCloseFeed,
  wsError: wsErrorFeed,
  wsMessage: wsMessageFeed
};

const wsActionsOrder = {
  wsConnect: wsConnectOrder,
  wsDisconnect: wsDisconnectOrder,
  wsConnecting: wsConnectingOrder,
  wsOpen: wsOpenOrder,
  wsClose: wsCloseOrder,
  wsError: wsErrorOrder,
  wsMessage: wsMessageOrder
};

const websocketOrderMiddleware = socketMiddleware(wsActionsOrder);
const websocketFeedMiddleware = socketMiddleware(wsActionsFeed);

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
    }).concat(websocketOrderMiddleware, websocketFeedMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type ThunkAPI = {
  dispatch: AppDispatch,
  extra: BurgerApi;
} 