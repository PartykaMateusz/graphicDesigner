import axios from "axios";
import { GET_ERRORS, GET_PROPOSALS } from "./types";

export const addProposal = proposal => async dispatch => {
  try {
    await axios.post(`/api/proposal/`, proposal);
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

export const cancelProposal = (userId, orderId) => async dispatch => {
  try {
    await axios.delete(`/api/proposal/order/${orderId}/user/${userId}`);
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

export const getOrderProposals = id => async dispatch => {
  try {
    const res = await axios.get(`/api/proposal/order/${id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_PROPOSALS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getUserProposals = (
  pageNumber,
  pageSize,
  userId
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/proposal/user/${userId}?page=${pageNumber}&size=${pageSize}`
    );
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_PROPOSALS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
