import axios from "axios";
import { GET_ERRORS } from "./types";

export const registerUser = (user, history) => async dispatch => {
  try {
    console.log("hehe");
    const res = await axios.post(
      "http://localhost:8082/api/register/user",
      user
    );
    //history.push("/");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
