import axios from "axios";
import { GET_ERRORS, GET_PROFILE } from "./types";

export const getUserByUsername = username => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${username}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
