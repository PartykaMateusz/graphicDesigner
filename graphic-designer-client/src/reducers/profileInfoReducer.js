import { GET_PROFILE_INFO, GET_AVATAR_INFO } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return action.payload;

    default:
      return state;
  }
}
