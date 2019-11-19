import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import profileReducer from "./profileReducer";
import categoryReducer from "./categoryReducer";
import OrdersReducer from "./OrdersReducer";
import OrderReducer from "./OrderReducer";
import ProfileInfoReducer from "./profileInfoReducer";
import ProposalReducer from "./ProposalReducer";
import JobsReducer from "./JobsReducer";
import JobReducer from "./JobReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  profile: profileReducer,
  categories: categoryReducer,
  orders: OrdersReducer,
  order: OrderReducer,
  profileInfo: ProfileInfoReducer,
  orderProposals: ProposalReducer,
  jobs: JobsReducer,
  job: JobReducer
});
