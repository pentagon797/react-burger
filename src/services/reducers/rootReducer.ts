import { combineReducers } from "redux";
import user, { sliceName as userSliceStore } from "./userSlice";

const rootReducer = combineReducers({
  [userSliceStore]: user,
});

export default rootReducer;
