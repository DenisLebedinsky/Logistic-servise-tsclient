import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from '../../../api';

import { AuthActionTypes, SuccessData } from './types';
import { loginFail, loginStart, loginSuccess } from './actions';

function* loginSaga(action: ReturnType<typeof loginStart>) {
  try {
    const successData: SuccessData = yield api.post(
      '/users/login',
      action.payload
    );

    debugger;
    if (!successData || successData.data.error) {
      throw new Error('Index is out of range');
    }

    yield put(loginSuccess(successData));
  } catch (e) {
    yield put(loginFail(e.message));
  }
}

function* watchLoginSaga() {
  yield takeEvery(AuthActionTypes.LOG_IN, loginSaga);
}

function* authSaga() {
  yield all([fork(watchLoginSaga)]);
}

export default authSaga;
