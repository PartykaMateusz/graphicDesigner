import axios from "axios";
import { GET_ERRORS, GET_PROFILE, GET_AVATAR } from "./types";

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
      payload: {}
    });
  }
};

export const getUserAvatar = id => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${id}/avatar`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: GET_AVATAR,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updateProfile = (userId, user, history) => async dispatch => {
  await axios.put(`/api/user/${userId}`, user);
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });

  //history.push("/profile");
};

export const updateAvatar = (userId, avatar) => async dispatch => {
  try {
    await axios.put(`/api/user/${userId}/avatar`, avatar);
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
