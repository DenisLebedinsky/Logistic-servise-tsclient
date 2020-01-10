import { all, fork } from 'redux-saga/effects';

import authSaga from '../reducers/auth/saga';

function* rootSaga() {
  yield all([fork(authSaga)]);
}

export default rootSaga;
