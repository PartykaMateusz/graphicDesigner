import { GET_PROFILE, GET_AVATAR } from "../actions/types";

const initialState = {
  data: {},
  avatar: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        data: action.payload
      };
    case GET_AVATAR:
      return {
        ...state,
        avatar: action.payload
      };
    default:
      return state;
  }
}
