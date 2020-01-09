import { all, fork, put, call, takeEvery } from "redux-saga/effects";
import { Auth, AuthActionTypes, successData } from "./types";
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
    const successData: successData = yield signIn({
      username: "ad",
      password: "efwf"
    });

    if (!successData) {
      throw new Error("Index is out of range");
    }

    yield put(loginSuccess(successData));
  } catch (e) {
    yield put(loginFail(e.message));
  }
}
