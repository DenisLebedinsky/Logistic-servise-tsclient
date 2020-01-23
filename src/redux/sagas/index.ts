import { all, fork } from 'redux-saga/effects';

import authSaga from '../reducers/auth/saga';
import packagesSaga from '../reducers/packages/saga';
import locationsSaga from '../reducers/locations/saga';
import qrCodeSaga from '../reducers/qrCode/saga';
import usersSaga from '../reducers/users/saga';

function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(packagesSaga),
    fork(locationsSaga),
    fork(qrCodeSaga),
    fork(usersSaga)
  ]);
}

export default rootSaga;
