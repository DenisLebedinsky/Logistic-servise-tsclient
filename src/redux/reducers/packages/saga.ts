import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from 'api';

import { PackagesActionTypes } from './types';
import {
  addPackage,
  addPackageFail,
  addPackageSuccess,
  deletePackage,
  deletePackageFail,
  deletePackageSuccess,
  getPackages,
  getPackagesFail,
  getPackagesSuccess,
  updatePackage,
  updatePackageFail,
  updatePackageSuccess
} from './actions';

function* getPackagesSaga(action: ReturnType<typeof getPackages>) {
  try {
    const { token, skip, limit } = action.payload;

    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/packages/', { skip, limit });

    if (result) {
      throw new Error('error with get data');
    }

    yield put(getPackagesSuccess(result.data));
  } catch (error) {
    yield put(getPackagesFail(error));
  }
}

function* addPackageSaga(action: ReturnType<typeof addPackage>) {
  try {
    const { token, newPackage } = action.payload;

    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/package/create', newPackage);

    if (result) {
      throw new Error('error with get update');
    }

    yield put(addPackageSuccess(result.data));
  } catch (error) {
    yield put(addPackageFail(error));
  }
}

function* updatePackageSaga(action: ReturnType<typeof updatePackage>) {
  try {
    const { token, editedPackage } = action.payload;
    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/package/update/', editedPackage);

    if (result) {
      throw new Error('error with get data');
    }

    yield put(updatePackageSuccess(result.data));
  } catch (error) {
    yield put(updatePackageFail(error));
  }
}

function* deletePackagesSaga(action: ReturnType<typeof deletePackage>) {
  try {
    const { token, id } = action.payload;
    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/package/delete', { id });

    if (result) {
      throw new Error('error with get data');
    }

    yield put(deletePackageSuccess(result.data));
  } catch (error) {
    yield put(deletePackageFail(error));
  }
}

// watchers
function* watchGetPackageSaga() {
  yield takeEvery(PackagesActionTypes.GET_PACKAGES, getPackagesSaga);
}

function* watchAddPackageSaga() {
  yield takeEvery(PackagesActionTypes.ADD_PACKAGE, addPackageSaga);
}

function* watchUpdatePackageSaga() {
  yield takeEvery(PackagesActionTypes.UPDATE_PACKAGE, updatePackageSaga);
}

function* watchDeletePackageSaga() {
  yield takeEvery(PackagesActionTypes.UPDATE_PACKAGE, deletePackagesSaga);
}
// main
function* packagesSaga() {
  yield all([
    fork(watchGetPackageSaga),
    fork(watchAddPackageSaga),
    fork(watchUpdatePackageSaga),
    fork(watchDeletePackageSaga)
  ]);
}

export default packagesSaga;
