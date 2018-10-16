import axios from "axios";
import { GET_ERRORS,LOGIN_PROMPT } from "./types";
import Login from "../components/auth/login";

//Register User Action

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      dispatch({
        type: LOGIN_PROMPT,
        payload: "You have been Registered, Kindly login"
      });
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
