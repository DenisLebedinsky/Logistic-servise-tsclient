import { action } from "typesafe-actions";

import { AuthActionTypes } from "./types";

export const login = () => action(AuthActionTypes.LOG_IN);

export const loginSuccess = (token: string) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { token });

export const loginFail = (err: string) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { error: err });
