import { all, fork } from 'redux-saga/effects';

import authSaga from '../reducers/auth/saga';
import packagesSaga from '../reducers/packages/saga';

function* rootSaga() {
  yield all([fork(authSaga), fork(packagesSaga)]);
}

export default rootSaga;
