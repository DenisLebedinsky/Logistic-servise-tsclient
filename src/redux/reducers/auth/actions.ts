import { action } from 'typesafe-actions';

import { AuthActionTypes, AuthData,Auth } from './types';

// login
export const loginStart = (authData: AuthData) =>
  action(AuthActionTypes.LOG_IN, authData);

export const loginSuccess = (successData: Auth) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, successData);

export const loginFail = (error: string) =>
  action(AuthActionTypes.LOG_IN_FAIL, { error});

export const logout = () => action(AuthActionTypes.LOG_OUT); 

//get ingo about auth user
export const getUserInfo = (token: string) => action(AuthActionTypes.GET_USER_INFO, token);

export const getUserInfoSuccess = (successData: Auth) =>
  action(AuthActionTypes.GET_USER_INFO_SUCCESS,  successData);

export const getUserInfoFail = (error: string) =>
  action(AuthActionTypes.GET_USER_INFO_FAIL, { error });
