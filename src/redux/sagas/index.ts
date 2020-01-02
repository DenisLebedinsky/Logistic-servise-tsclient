 
import { all, fork } from "redux-saga/effects";

import { auth } from "../reducers/auth/saga";

export function* rootSaga() {
  yield all([fork(auth)]);
}