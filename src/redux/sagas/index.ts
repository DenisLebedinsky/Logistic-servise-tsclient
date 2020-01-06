import { all, fork } from "redux-saga/effects";

import { authSaga } from "../reducers/auth/saga";

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
