import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import profileReducer from "./profileReducer";
import categoryReducer from "./categoryReducer";
import OrdersReducer from "./OrdersReducer";
import OrderReducer from "./OrderReducer";
import ProfileInfoReducer from "./profileInfoReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  profile: profileReducer,
  categories: categoryReducer,
  orders: OrdersReducer,
  order: OrderReducer,
  profileInfo: ProfileInfoReducer
});
