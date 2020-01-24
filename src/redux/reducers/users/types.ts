export type User = {
  name: string;
  login: string;
  phone: string;
  role: string;
  locationId: {
    _id: string;
    title: string;
  };
  _id?: string;
  id?: string;
};

export type UserEditable = {
  id: string;
  name: string;
  login: string;
  phone: string;
  role: string;
  locationId: string;
};

// type UserLocation = {
//   _id: string;
//   title: string;
// };

export type UserType = {
  loading: boolean;
  error: boolean;
  users: User[];
};

export enum UsersActionTypes {
  GET_USERS = '@@users/GET_USERS',
  GET_USERS_SUCCESS = '@@users/GET_USERS_SUCCESS',
  GET_USERS_FAIL = '@@users/GET_USERS_FAIL',

  ADD_USER = '@@users/ADD_USER',
  ADD_USER_SUCCESS = '@@users/ADD_USER_SUCCESS',
  ADD_USER_FAIL = '@@users/ADD_USER_FAIL',

  UPDATE_USER = '@@users/UPDATE_USER',
  UPDATE_USER_SUCCESS = '@@users/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAIL = '@@users/UPDATE_USER_FAIL',

  DELETE_USER = '@@users/DELETE_USER',
  DELETE_USER_SUCCESS = '@@users/DELETE_USER_SUCCESS',
  DELETE_USER_FAIL = '@@users/DELETE_USER_FAIL'
}
