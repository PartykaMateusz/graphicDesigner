import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  profile: profileReducer
});
