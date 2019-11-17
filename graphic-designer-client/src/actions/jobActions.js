import axios from "axios";
import { GET_ERRORS } from "./types";

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
