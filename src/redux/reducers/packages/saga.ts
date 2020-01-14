import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from '../../../api';

import { PackagesActionTypes } from './types';
import {
  getPackages,
  getPackagesFail,
  getPackagesSuccess,
  addPackage,
  addPackageSuccess,
  addPackageFail,
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

function* addPackagesSaga(action: ReturnType<typeof addPackage>) {
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

function* updatePackagesSaga(action: ReturnType<typeof updatePackage>) {
  try {
    const { token, updatePackage } = action.payload;
    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/package/update/', updatePackage);

    if (result) {
      throw new Error('error with get data');
    }

    yield put(updatePackageSuccess(result.data));
  } catch (error) {
    yield put(updatePackageFail(error));
  }
}

// watchers
function* watchGetPackageSaga() {
  yield takeEvery(PackagesActionTypes.GET_PACKAGES, getPackagesSaga);
}

function* watchAddPackageSaga() {
  yield takeEvery(PackagesActionTypes.ADD_PACKAGES, addPackagesSaga);
}

function* watchUpdatePackageSaga() {
  yield takeEvery(PackagesActionTypes.UPDATE_PACKAGES, updatePackagesSaga);
}
// main
function* packagesSaga() {
  yield all([
    fork(watchGetPackageSaga),
    fork(watchAddPackageSaga),
    fork(watchUpdatePackageSaga)
  ]);
}

export default packagesSaga;
