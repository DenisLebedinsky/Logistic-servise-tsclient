import ReactToPrint from 'react-to-print';
import { Button } from '@material-ui/core';

import React, { useRef, useState } from 'react';
import './Barcode.scss';

const Barcode = ({ data }) => {
  const componentRef = useRef();
  const [qrCount, setqrCount] = useState({ n: 1, arr: [1] });

  const printImgCount = e => {
    const { value } = e.target;
    const newArr = [];

    for (let i = 0; i < value; i++) {
      newArr.push(i);
    }

    setqrCount({ n: value, arr: newArr });
  };

  return (
    <div className="barcode">
      <img
        id="myimg"
        src={data.qr}
        className="barcode-item"
        alt="error try restar page"
      />
      <input
        type="number"
        className="barcode-input"
        value={qrCount.n}
        onChange={e => printImgCount(e)}
      />
      <ReactToPrint
        trigger={() => (
          <Button variant="contained" className="barcode-item">
            Печать
          </Button>
        )}
        content={() => componentRef.current}
      />
      <div id="printQR" className="barcode-notPrint" ref={componentRef}>
        {qrCount.arr.map((el, i) => (
          <div key={`qr_${i}`} className="barcode-block">
            <img src={data.qr} alt="error restart page" className="barcode-block-img" />
            <div className="barcode-block-info">
              <span className="barcode-block-value">Отправитель:</span>
              <span>{data.location}</span>
            </div>
            <div className="barcode-block-info">
              <span className="barcode-block-value">Получатель:</span>
              <span>{data.resiveLoc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Barcode;
