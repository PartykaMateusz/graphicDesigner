import axios from "axios";
import { GET_CATEGORIES, GET_FAVOURITE_CATEGORIES, GET_ERRORS } from "./types";

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

export const getFavouriteCategories = (userId, limit) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/category/favourite/user/${userId}?limit=${limit}`
    );
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_FAVOURITE_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
