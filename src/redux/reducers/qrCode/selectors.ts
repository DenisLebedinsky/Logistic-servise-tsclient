import { AppState } from 'redux/store.type';

export const qrCodeFromState = (state: AppState) => state.qrCode.qr;
