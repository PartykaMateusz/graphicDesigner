import axios from "axios";
import { GET_ERRORS, GET_ORDERS, GET_ORDER } from "./types";

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

export const getOrders = (page, size) => async dispatch => {
  try {
    const res = await axios.get(`/api/order/?page=${page}&size=${size}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }
};

export const getUserOrders = (page, size, userId) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/order/?page=${page}&size=${size}&userId=${userId}`
    );
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }
};

export const getOrder = id => async dispatch => {
  try {
    const res = await axios.get(`/api/order/${id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_ORDER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  }
};
