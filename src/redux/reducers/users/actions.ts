import { action } from "typesafe-actions";

import { UserActionTypes } from "./types";

export const getUsers = () => action(UserActionTypes.GET_USERS);

export const getUsersSuccess = (token: string) =>
  action(UserActionTypes.GET_USERS_SUCCESS, { token });

export const loginFail = (err: string) =>
  action(UserActionTypes.GET_USERS_FAIL, { error: err });

