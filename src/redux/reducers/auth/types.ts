export type Auth = {
  loading: boolean;
  user: {
    username: string;
    token: string;
  };
  error: boolean;
};

export enum AuthActionTypes {
  LOG_IN = '@@auth/LOG_IN',
  LOG_IN_SUCCESS = '@@auth/LOG_IN_SUCCESS',
  LOG_IN_FAIL = '@@auth/LOG_IN_FAIL'
}

export type SuccessData = {
  status: number;
  statusText: string;
  data: {
    token: string;
    username: string;
    error: boolean;
  };
};

export type AuthData = {
  username: string;
  password: string;
};
