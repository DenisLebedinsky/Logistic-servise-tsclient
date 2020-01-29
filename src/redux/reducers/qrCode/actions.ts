import { action } from 'typesafe-actions';

import { QRCode, QRCodeActionTypes } from './types';

export const getQRCode = (token: string, id: string) =>
  action(QRCodeActionTypes.GET_QR_CODE, { token, id });

export const getQRCodeSuccess = (qrCode: QRCode) =>
  action(QRCodeActionTypes.GET_QR_CODE_SUCCESS, qrCode);

export const getQRCodeFail = (error: string) =>
  action(QRCodeActionTypes.GET_QR_CODE_FAIL, error);

export const clearQRcode = () => action(QRCodeActionTypes.CLEAR_QR_CODE);
