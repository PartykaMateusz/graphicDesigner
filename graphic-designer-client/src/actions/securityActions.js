import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
import setJWTToken from "../securityUtils/setJWTToken";

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
    let usernameOauth = "clientReact";
    let passwordOauth = "reactPassword";

    const res = await axios.post(
      `/oauth/token?grant_type=password&username=${user.username}&password=${user.password}`,
      {},
      {
        auth: {
          username: usernameOauth,
          password: passwordOauth
        }
      }
    );

    const token = res.data["access_token"];

    localStorage.setItem("jwtToken", token);
    setJWTToken(token);

    const decoded = jwt_decode(token);

    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
