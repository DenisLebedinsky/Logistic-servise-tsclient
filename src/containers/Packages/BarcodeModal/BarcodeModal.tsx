import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import Barcode from 'containers/Barcode';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { qrCodeFromState } from 'redux/reducers/qrCode/selectors';
import { getQRCode } from 'redux/reducers/qrCode/actions';
import { getAuth } from 'redux/reducers/auth/selectors';

import { BarcodeModalFC } from './types';
import styles from './BarcodeModal.module.scss';

const BarcodeModal: React.FC<BarcodeModalFC> = ({ data, closeModal }) => {
  const dispatch = useDispatch();
  const qrCode = useSelector(qrCodeFromState);
  const auth = useSelector(getAuth);

  useEffect(() => {
    if (!qrCode) {
      dispatch(getQRCode(auth.user.token, data.id));
    }
  });

  function handleClose(e: React.MouseEvent) {
    closeModal();
  }
console.log(qrCode);
  return (
    <div id="modal-qr" className={styles.containerModal}>
      <div className={styles.barcodeModal}>
        <div className={styles.iconClose}>
          <CloseIcon onClick={handleClose} />
        </div>
        {qrCode ? (
          <Barcode data={{ ...data, qr: qrCode }} />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default BarcodeModal;
