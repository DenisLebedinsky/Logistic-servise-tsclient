import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from 'api';

import { Auth, AuthActionTypes } from './types';
import {
  getUserInfo,
  getUserInfoFail,
  getUserInfoSuccess,
  loginFail,
  loginStart,
  loginSuccess,
  logout
} from './actions';

function* loginSaga(action: ReturnType<typeof loginStart>) {
  try {
    const result: any = yield api.post('/users/login', action.payload);

    if (!result) {
      throw new Error('Forbidden');
    }

    const successData: Auth = {
      loading: false,
      user: {
        username: result.data.username,
        token: result.data.token,
        role: result.data.role,
        locationId: result.data.locationId,
        id: result.data.id
      },
      error: false
    };

    localStorage.setItem('user', JSON.stringify(result.data));

    yield put(loginSuccess(successData));
  } catch (e) {
    yield put(loginFail(e.message));
  }
}

function* logoutSaga(action: ReturnType<typeof logout>) {
  yield localStorage.removeItem('user');
}

function* userInfoSaga(action: ReturnType<typeof getUserInfo>) {
  try {
    api.defaults.headers.common.Authorization = `Baerer ${action.payload}`;

    const result: any = yield api.post('/users/getByToken');

    if (!result) {
      throw new Error('Forbidden');
    }

    const successData: Auth = { ...result.data, token: action.payload };

    yield put(getUserInfoSuccess(successData));
  } catch (e) {
    yield put(getUserInfoFail(e.message));
  }
}

// wathers
function* watchLoginSaga() {
  yield takeEvery(AuthActionTypes.LOG_IN, loginSaga);
}

function* watchLogoutSaga() {
  yield takeEvery(AuthActionTypes.LOG_OUT, logoutSaga);
}

function* watchUserInfoSaga() {
  yield takeEvery(AuthActionTypes.GET_USER_INFO, userInfoSaga);
}

// main
function* authSaga() {
  yield all([
    fork(watchLoginSaga),
    fork(watchLogoutSaga),
    fork(watchUserInfoSaga)
  ]);
}

export default authSaga;
