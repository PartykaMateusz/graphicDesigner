import { GET_JOBS, GET_JOB } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_JOBS:
      return action.payload;

    default:
      return state;
  }
}
