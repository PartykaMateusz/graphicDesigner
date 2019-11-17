import axios from "axios";
import { GET_ERRORS, GET_JOBS } from "./types";

export const createJob = (job, history) => async dispatch => {
  try {
    await axios.post(`/api/job/`, job);
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

export const getClientJobs = (page, size, clientId) => async dispatch => {
  // try {
  const res = await axios.get(
    `/api/job/client/${clientId}?page=${page}&size=${size}`
  );
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
  dispatch({
    type: GET_JOBS,
    payload: res.data
  });
  // } catch (error) {
  //   dispatch({
  //     type: GET_ERRORS,
  //     payload: error.response.data
  //   });
  // }
};
