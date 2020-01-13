import React from 'react';
import styles from './BarcodeModal';
import Barcode from '../../../containers/Barcode';

export default function BarcodeModal({ any: handleClose, any: open }) {
  return (
    <div id="modal-qr" className={styles.containerModal}>
      <div className={styles.barcodeModal}>
        <div className={styles.iconClose}>
          <CloseIcon onClick={handleClose} />
        </div>
        <Barcode qr={open.qr} data={open.data} />
      </div>
    </div>
  );
}
