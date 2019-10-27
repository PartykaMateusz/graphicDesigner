import axios from "axios";
import { GET_CATEGORIES, GET_ERRORS } from "./types";

export const getAllCategories = () => async dispatch => {
  try {
    const res = await axios.get(`/api/category`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
