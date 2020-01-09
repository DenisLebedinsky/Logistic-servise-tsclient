export type Auth = {
  loading: boolean;
  user: {
    username: string;
    token: string;
  };
  error: string;
};

export enum AuthActionTypes {
  LOG_IN = "@@auth/LOG_IN",
  LOG_IN_SUCCESS = "@@auth/LOG_IN_SUCCESS",
  LOG_IN_FAIL = "@@auth/LOG_IN_FAIL"
}

export type successData = {
  token: string;
  username: string;
};

export type authData = {
  username: string;
  password: string;
};
