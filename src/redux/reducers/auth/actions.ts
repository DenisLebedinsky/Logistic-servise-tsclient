import { action } from "typesafe-actions";

import { AuthActionTypes, successData } from "./types";

export const login = () => action(AuthActionTypes.LOG_IN);

export const loginSuccess = (successData: successData) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { user: successData });

export const loginFail = (err: string) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { error: err });
