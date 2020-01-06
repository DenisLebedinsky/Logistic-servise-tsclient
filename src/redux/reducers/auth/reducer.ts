import { Reducer } from "redux";

import { Auth, AuthActionTypes } from "./types";

const initialState: Auth = {
  loading: false,
  token: "",
  error: ""
};

export const reducer: Reducer<Auth> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AuthActionTypes.LOG_IN:
      return state;
    case AuthActionTypes.LOG_IN_SUCCESS:
      return { ...state, ...payload };
    case AuthActionTypes.LOG_IN_FAIL:
      return { ...state, ...payload };
    default:
      return state;
  }
};
