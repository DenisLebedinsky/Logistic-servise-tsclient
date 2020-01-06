export type Auth = {
  loading: boolean;
  token: string;
  error: string;
};

export enum AuthActionTypes {
  LOG_IN = "@@cart/LOG_IN",
  LOG_IN_SUCCESS = "@@cart/LOG_IN_SUCCESS",
  LOG_IN_FAIL = "@@cart/LOG_IN_FAIL"
}
