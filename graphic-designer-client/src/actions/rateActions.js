import axios from "axios";
import { GET_ERRORS, GET_RATE } from "./types";

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

export const getRatingByUserId = (userId, page, size) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/rate/user/${userId}?page=${page}&size=${size}`
    );
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_RATE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
