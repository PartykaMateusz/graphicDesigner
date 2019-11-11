import { GET_PROPOSALS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROPOSALS:
      return action.payload;
    default:
      return state;
  }
}
