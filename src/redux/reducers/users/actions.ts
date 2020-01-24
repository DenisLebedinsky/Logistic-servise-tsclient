import { action } from 'typesafe-actions';

import { User, UsersActionTypes } from './types';

export const getUsers = (token: string, skip: number, limit: number) =>
  action(UsersActionTypes.GET_USERS, { token, skip, limit });

export const getUsersSuccess = (users: User[]) =>
  action(UsersActionTypes.GET_USERS_SUCCESS, users);

export const getUsersFail = (err: string) =>
  action(UsersActionTypes.GET_USERS_FAIL, { error: err });

// add
export const addUser = (token: string, newUser: User) =>
  action(UsersActionTypes.ADD_USER, { token, newUser });

export const addUserSuccess = (newUser: User) =>
  action(UsersActionTypes.ADD_USER_SUCCESS, newUser);

export const addUserFail = (error: string) =>
  action(UsersActionTypes.ADD_USER_FAIL, error);

// update
export const updateUser = (token: string, editedUser: User) =>
  action(UsersActionTypes.UPDATE_USER, { token, editedUser });

export const updateUserSuccess = (updatedUser: User) =>
  action(UsersActionTypes.UPDATE_USER_SUCCESS, updatedUser);

export const updateUserFail = (error: string) =>
  action(UsersActionTypes.UPDATE_USER_FAIL, error);

// delete
export const deleteUser = (token: string, id: string) =>
  action(UsersActionTypes.DELETE_USER, { token, id });

export const deleteUserSuccess = (deletedLocation: Location) =>
  action(UsersActionTypes.DELETE_USER_SUCCESS, deletedLocation);

export const deleteUserFail = (error: string) =>
  action(UsersActionTypes.DELETE_USER_FAIL, error);
