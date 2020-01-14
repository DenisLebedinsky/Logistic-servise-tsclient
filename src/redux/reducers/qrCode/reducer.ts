import { Reducer } from 'redux';

import { QRCodeActionTypes, QRCodeType } from './types';

const initialState: QRCodeType = {
  error: false,
  loading: false,
  qr: ''
};

const reducer: Reducer<QRCodeType> = (
  state: QRCodeType = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case QRCodeActionTypes.GET_QR_CODE:
      return { ...state, error: true, loading: true };
    case QRCodeActionTypes.GET_QR_CODE_SUCCESS:
      return { loading: false, error: false, qr: payload.qr };
    case QRCodeActionTypes.GET_QR_CODE_FAIL:
      return { ...state, error: true };

    default:
      return state;
  }
};

export default reducer;
