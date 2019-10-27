import axios from "axios";
import { GET_ERRORS } from "./types";

export const addOrder = (work, history) => async dispatch => {
  try {
    await axios.post(`/api/order/`, work);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/index");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }
};
