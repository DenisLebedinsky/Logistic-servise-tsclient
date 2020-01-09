import { action } from "typesafe-actions";

import { AuthActionTypes, successData, authData } from "./types";

export const login = (authData: authData) =>
  action(AuthActionTypes.LOG_IN, authData);

export const loginSuccess = (successData: successData) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { user: successData });

export const loginFail = (err: string) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { error: err });
