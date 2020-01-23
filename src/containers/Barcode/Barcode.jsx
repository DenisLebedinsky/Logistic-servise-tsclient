import ReactToPrint from 'react-to-print';
import { Button } from '@material-ui/core';

import React, { useRef, useState } from 'react';

import styles from './Barcode.module.scss';
// import { BarcodeFC } from './types';

const Barcode = ({ data }) => {
  const componentRef = useRef();
  const [qrCount, setqrCount] = useState({ n: 1, arr: [1] });

  const printImgCount = e => {
    const value = parseInt(e.target.value, 10);
    const newArr = [];

    for (let i = 0; i < value; i++) {
      newArr.push(i);
    }

    setqrCount({ n: value, arr: newArr });
  };

  const print = () => () => {
    window.print();
  };

  return (
    <div className={styles.qrBlock}>
      <img
        id="myimg"
        src={data.qr}
        className={styles.qrElement}
        alt="error try restar page"
      />
      <input
        type="number"
        className={styles.input}
        value={qrCount.n}
        onChange={e => printImgCount(e)}
      />
      <ReactToPrint
        trigger={() => (
          <Button
            variant="contained"
            className={styles.qrElement}
            onClick={print}
          >
            Печать
          </Button>
        )}
        content={() => componentRef.current}
      />
      <div
        id="printQR"
        className={styles.qrNoPrint}
        ref={componentRef}
      >
        {qrCount.arr.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`qr_${i}`} className={styles.infoBlock}>
            <img
              src={data.qr}
              alt="error restart page"
              className={styles.QRimage}
            />
            <div className={styles.info}>
              <span className={styles.infoBold}>Отправитель:</span>
              <span>{data.location}</span>
            </div>
            <div className={styles.info}>
              <span className={styles.infoBold}>Получатель:</span>
              <span>{data.resiveLoc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Barcode;
