import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { Auth, AuthActionTypes, successData, authData } from "./types";
import { signIn } from "../../../api/auth";
import { login, loginSuccess, loginFail } from "./actions";

export function* authSaga() {
  yield all([fork(watchLoginSaga)]);
}

function* watchLoginSaga() {
  yield takeEvery(AuthActionTypes.LOG_IN, loginSaga);
}

function* loginSaga(authData: authData) {
  console.log(authData);
  try {
    const successData: successData = yield signIn(authData);

    if (!successData) {
      throw new Error("Index is out of range");
    }

    yield put(loginSuccess(successData));
  } catch (e) {
    yield put(loginFail(e.message));
  }
}
