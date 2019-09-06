import axios from "axios";
import { GET_ERRORS } from "./types";

export const registerUser = (user, history) => async dispatch => {
  try {
    const res = await axios.post("/api/register", user);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const login = user => async dispatch => {
  try {
    const res = await axios.post("/api/register", user);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
