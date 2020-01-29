export interface QRCode {
  qr: string;
}

export interface QRCodeType {
  loading: boolean;
  error: boolean;
  qr: string;
}

export enum QRCodeActionTypes {
  GET_QR_CODE = '@@qrCode/GET_QR_CODE',
  GET_QR_CODE_SUCCESS = '@@qrCode/GET_QR_CODE_SUCCESS',
  GET_QR_CODE_FAIL = '@@qrCode/GET_QR_CODE_FAIL',

  CLEAR_QR_CODE = '@@qrCode/CLEAR_QR_CODE'
}
