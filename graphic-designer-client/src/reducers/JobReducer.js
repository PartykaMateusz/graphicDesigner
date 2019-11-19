import { GET_JOB } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_JOB:
      return action.payload;
    default:
      return state;
  }
}
