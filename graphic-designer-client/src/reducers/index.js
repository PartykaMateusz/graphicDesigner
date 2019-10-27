import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import profileReducer from "./profileReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  profile: profileReducer,
  categories: categoryReducer
});
