import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from 'api';

import { UsersActionTypes } from './types';
import {
  addUser,
  addUserFail,
  addUserSuccess,
  deleteUser,
  deleteUserFail,
  deleteUserSuccess,
  getUsers,
  getUsersFail,
  getUsersSuccess,
  updateUser,
  updateUserFail,
  updateUserSuccess
} from './actions';

function* getUsersSaga(action: ReturnType<typeof getUsers>) {
  try {
    const { token, skip, limit } = action.payload;

    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/users/', { skip, limit });

    if (!result) {
      throw new Error('error with get data');
    }

    yield put(getUsersSuccess(result.data));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

function* addUserSaga(action: ReturnType<typeof addUser>) {
  try {
    const { token, newUser } = action.payload;

    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/users/create', newUser);

    if (!result) {
      throw new Error('error with get update');
    }

    yield put(addUserSuccess(result.data));
  } catch (error) {
    yield put(addUserFail(error));
  }
}

function* updateUsersaga(action: ReturnType<typeof updateUser>) {
  try {
    const { token, editedUser } = action.payload;
    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/users/update/', editedUser);

    if (!result) {
      throw new Error('error with get data');
    }

    yield put(updateUserSuccess(result.data));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* deleteUsersaga(action: ReturnType<typeof deleteUser>) {
  try {
    const { token, id } = action.payload;
    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/users/delete', { id });

    if (!result) {
      throw new Error('error with get data');
    }

    yield put(deleteUserSuccess(result.data));
  } catch (error) {
    yield put(deleteUserFail(error));
  }
}

// watchers
function* watchGetUsersSaga() {
  yield takeEvery(UsersActionTypes.GET_USERS, getUsersSaga);
}

function* watchAddUsersaga() {
  yield takeEvery(UsersActionTypes.ADD_USER, addUserSaga);
}

function* watchUpdateUsersaga() {
  yield takeEvery(UsersActionTypes.UPDATE_USER, updateUsersaga);
}

function* watchDeleteUsersaga() {
  yield takeEvery(UsersActionTypes.DELETE_USER, deleteUsersaga);
}
// main
function* usersSaga() {
  yield all([
    fork(watchGetUsersSaga),
    fork(watchAddUsersaga),
    fork(watchUpdateUsersaga),
    fork(watchDeleteUsersaga)
  ]);
}

export default usersSaga;
