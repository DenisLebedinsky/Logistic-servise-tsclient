import { action } from 'typesafe-actions';

import { AuthActionTypes, AuthData, SuccessData } from './types';

export const loginStart = (authData: AuthData) =>
  action(AuthActionTypes.LOG_IN, authData);

export const loginSuccess = (successData: SuccessData) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { user: successData.data });

export const loginFail = (err: string) =>
  action(AuthActionTypes.LOG_IN_SUCCESS, { error: err });
