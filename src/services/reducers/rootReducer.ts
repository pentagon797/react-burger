import { combineReducers } from "redux";
import user, { sliceName as userSliceStore } from "./userSlice";
import { ordersReducer } from "./orderReducer";
import { feedReducer } from "./feedReducer";

const rootReducer = combineReducers({
  [userSliceStore]: user,
  orderPage: ordersReducer,
  feedPage: feedReducer
});

export default rootReducer;
