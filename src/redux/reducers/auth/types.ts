export type Auth = {
  loading: boolean;
  user: {
    username: string;
    token: string;
    role: string;
    locationId: string;
    id: string;
  };
  error: boolean;
};

export enum AuthActionTypes {
  LOG_IN = '@@auth/LOG_IN',
  LOG_IN_SUCCESS = '@@auth/LOG_IN_SUCCESS',
  LOG_IN_FAIL = '@@auth/LOG_IN_FAIL',
  LOG_OUT = '@@auth/LOG_OUT',
  
  GET_USER_INFO = "@@auth/GET_USER_INFO",
  GET_USER_INFO_SUCCESS = "@@auth/GET_USER_INFO_SUCCESS",
  GET_USER_INFO_FAIL = "@@auth/GET_USER_INFO_FAIL"
}

export type AuthData = {
  login: string;
  password: string;
};
