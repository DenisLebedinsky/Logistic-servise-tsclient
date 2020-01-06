import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { Auth, AuthActionTypes } from "./types";
import { signIn } from "../../../api/auth";
import { login, loginSuccess, loginFail } from "./actions";

export function* authSaga() {
  yield all([fork(watchLoginSaga)]);
}

function* watchLoginSaga() {
  yield takeEvery(AuthActionTypes.LOG_IN, loginSaga);
}

function* loginSaga(data: any) {
  console.log(data);
  try {
    const token: string = yield signIn({ username: "ad", password: "efwf" });

    if (!token) {
      throw new Error("Index is out of range");
    }

    yield put(loginSuccess(token));
  } catch (e) {
    yield put(loginFail(e.message));
  }
}
