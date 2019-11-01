import { GET_ORDER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.payload;

    default:
      return state;
  }
}
