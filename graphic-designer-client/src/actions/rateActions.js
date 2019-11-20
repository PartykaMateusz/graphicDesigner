import axios from "axios";
import { GET_ERRORS } from "./types";

export const createRate = (rate, history) => async dispatch => {
  try {
    await axios.post(`/api/rate/`, rate);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/userPanel");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
