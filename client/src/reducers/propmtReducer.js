import { LOGIN_PROMPT } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PROMPT:
      return action.payload;
    default:
      return state;
  }
};