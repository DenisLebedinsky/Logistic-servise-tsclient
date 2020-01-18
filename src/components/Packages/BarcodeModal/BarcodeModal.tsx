import React from 'react';
import styles from './BarcodeModal.module.scss';
import Barcode from 'containers/Barcode';
import CloseIcon from '@material-ui/icons/Close';
import { BarcodeModalFC } from './types';

const BarcodeModal: React.FC<BarcodeModalFC> = ({ data, closeModal }) => {
  function handleClose(e: React.MouseEvent) {
    closeModal();
  }

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
};

export default BarcodeModal;
