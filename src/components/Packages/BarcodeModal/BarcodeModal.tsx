import React from 'react';
import styles from './BarcodeModal.module.scss';
import Barcode from '../../../containers/Barcode';
import CloseIcon from '@material-ui/icons/Close';

type barcodeModal = {
  qr: string;
  id: string;
  location: string;
  resiveLoc: string;
};

export default function BarcodeModal({ handleClose, data }) {
  return (
    <div id="modal-qr" className={styles.containerModal}>
      <div className={styles.barcodeModal}>
        <div className={styles.iconClose}>
          <CloseIcon onClick={handleClose} />
        </div>
        <Barcode data={data} />
      </div>
    </div>
  );
}
