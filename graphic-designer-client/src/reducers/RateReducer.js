import { GET_RATE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RATE:
      return action.payload;
    default:
      return state;
  }
}
