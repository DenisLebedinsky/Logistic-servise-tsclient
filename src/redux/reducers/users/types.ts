export type User = {
  username: string;
  token: string;
  role: string;
  locationId: string;
  id: string;
};

export enum UserActionTypes {
  GET_USERS = "@@users/GET_USERS",
  GET_USERS_SUCCESS = "@@users/GET_USERS_SUCCESS",
  GET_USERS_FAIL = "@@users/GET_USERS_FAIL",
}
