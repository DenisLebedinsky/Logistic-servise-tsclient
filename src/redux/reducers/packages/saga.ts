import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from '../../../api';

import { PackagesActionTypes } from './types';
import { getPackages, getPackagesFail, getPackagesSuccess } from './actions';

function* getPackagesSaga(action: ReturnType<typeof getPackages>) {
  try {
    api.defaults.headers.common.Authorization = `Baerer ${action.payload}`;

    const result: any = yield api.post('/packages/');

    if (result) {
      throw new Error('error with get data');
    }

    yield put(getPackagesSuccess(result.data));
  } catch (error) {
    yield put(getPackagesFail(error));
  }
}

// watchers
function* watchGetPackageSaga() {
  yield takeEvery(PackagesActionTypes.GET_PACKAGES, getPackagesSaga);
}
// main
function* packagesSaga() {
  yield all([fork(watchGetPackageSaga)]);
}

export default packagesSaga;
