import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from '../../../api';

import { PackagesActionTypes } from './types';
import { getPackages, getPackagesFail, getPackagesSuccess } from './actions';

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

// watchers
function* watchGetPackageSaga() {
  yield takeEvery(PackagesActionTypes.GET_PACKAGES, getPackagesSaga);
}
// main
function* packagesSaga() {
  yield all([fork(watchGetPackageSaga)]);
}

export default packagesSaga;
