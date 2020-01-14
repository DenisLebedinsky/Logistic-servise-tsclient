import { all, fork, put, takeEvery } from 'redux-saga/effects';

import api from '../../../api';

import { QRCodeActionTypes } from './types';
import { getQRCode, getQRCodeFail, getQRCodeSuccess } from './actions';

function* getQRCodeSaga(action: ReturnType<typeof getQRCode>) {
  try {
    const { token, id } = action.payload;

    api.defaults.headers.common.Authorization = `Baerer ${token}`;

    const result: any = yield api.post('/package/getBarcode', { id });

    if (result) {
      throw new Error('error with get data');
    }

    yield put(getQRCodeSuccess(result.data));
  } catch (error) {
    yield put(getQRCodeFail(error));
  }
}

// watchers
function* watchGetQRCodeSaga() {
  yield takeEvery(QRCodeActionTypes.GET_QR_CODE, getQRCodeSaga);
}
// main
function* qrCodeSaga() {
  yield all([fork(watchGetQRCodeSaga)]);
}

export default qrCodeSaga;
