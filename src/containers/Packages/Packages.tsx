import React, { useEffect, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import styles from './Packages.module.scss';

export default function Packages() {



  const openModal = (e: React.MouseEvent) => {
    //open modal
  };

  const converStatus = status => {
    if (status === "inProcess") {
      return "отправлено";
    }
    if (status === "accepted") {
      return "принято";
    }
    if (status === "notSent") {
      return "не отправлено";
    }
    return status;
  };

  return (
    <div className={styles.container}>
      <Button variant="contained" color="primary" onClick={openModal}>
        Создать отправление
      </Button>
      <Paper className={styles.root}>
        <Table
          className={styles.table}
          style={{ borderColor: 'black' }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left" className={styles.cellNumber}>
                Номер
              </TableCell>
              <TableCell align="left">Дата создания</TableCell>
              <TableCell align="left">Отправитель</TableCell>
              <TableCell align="left">Начальный получатель</TableCell>
              <TableCell align="left">Фактический получатель</TableCell>
              <TableCell align="left">Дата отправки</TableCell>
              <TableCell align="left">Дата получения</TableCell>
              <TableCell align="left">Принял</TableCell>
              <TableCell align="left">Опись вложения</TableCell>

              <TableCell align="left">
                <div className={styles.transit}>
                  <div className={styles.transitBlock1}>
                    Транзитный получатель
                  </div>
                  <div className={styles.transitBlock1}>
                    фактический транзитный получатель
                  </div>
                  <div className={styles.transitBlock2}>
                    Дата отправки с транзитного склада
                  </div>
                  <div className={styles.transitBlock3}>Отправитель</div>
                </div>
              </TableCell>

              <TableCell align="center">Статус</TableCell>
              <TableCell align="left">Комментарий</TableCell>
              <TableCell align="left">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item, indexRow) => (
                <TableRow
                  key={item._id}
                  className={setClassnameIventory(indexRow)}
                >
                  <TableCell align="left" component="th" scope="row">
                    {item.number}
                  </TableCell>
                  <TableCell align="left">
                    {moment(item.created).format('DD.MM.YYYY  HH:mm')}
                  </TableCell>
                  <TableCell align="left">
                    {item.sendUserId && item.sendUserId.name}
                  </TableCell>
                  <TableCell align="left">
                    {item.resiverId && item.resiverId.title}
                  </TableCell>
                  <TableCell align="left">
                    {item.factResiverId && item.factResiverId.title}
                  </TableCell>
                  <TableCell align="left">
                    {item.sendData &&
                      moment(item.sendData).format('DD.MM.YYYY HH:mm')}
                  </TableCell>
                  <TableCell align="left">
                    {item.resiveData &&
                      moment(item.resiveData).format('DD.MM.YYYY  HH:mm')}
                  </TableCell>
                  <TableCell align="center">
                    {item.recipientId && item.recipientId.name}
                  </TableCell>

                  <TableCell className={styles.cellInventory} align="left">
                    {item.inventory.map((el, i) => (
                      <div
                        key={`inventory_${i}`}
                        className={
                          item.inventory.length - 1 === i
                            ? styles.lastList
                            : styles.list
                        }
                      >
                        <div>{el.title}</div>
                        <div>({el.count})</div>
                      </div>
                    ))}
                  </TableCell>

                  <TableCell align="center">
                    {item.transit.map((el, i) => (
                      <div
                        key={`trsendid_${i}`}
                        className={
                          item.transit.length - 1 === i
                            ? styles.transitLastRow
                            : styles.transitRow
                        }
                      >
                        <div className={styles.transitBlock1}>
                          {el.sendLocId && el.sendLocId.title}
                        </div>
                        <div className={styles.transitBlock1}>
                          {el.sendfactLocId && el.sendfactLocId.title}
                          {el.resivedDate && (
                            <span>
                              {moment(el.resivedDate).format(
                                'DD.MM.YYYY  HH:mm'
                              )}
                            </span>
                          )}
                        </div>
                        <div className={styles.transitBlock3}>
                          {el.date &&
                            moment(el.date).format('DD.MM.YYYY  HH:mm')}
                        </div>
                        <div className={styles.transitBlock2}>
                          {el.userId && el.userId.name}
                        </div>
                      </div>
                    ))}
                  </TableCell>

                  <TableCell
                    align="center"
                    className={statusClass(item.status)}
                  >
                    {converStatus(item.status)}
                  </TableCell>

                  <TableCell align="left">{item.comment}</TableCell>

                  <TableCell align="center">
                    <div className={styles.actions}>
                      {(id === item.sendUserId && item.status === 'notSent') ||
                      role === 'admin' ? (
                        <EditIcon
                          className={styles.action}
                          onClick={() => handleOpenEdit(indexRow)}
                        />
                      ) : null}
                      <FileIcon
                        className={styles.action}
                        onClick={() => handleOpen(item)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/*<Modal*/}
        {/*  aria-labelledby="simple-modal-title"*/}
        {/*  aria-describedby="simple-modal-description"*/}
        {/*  open={open.state}*/}
        {/*  onClose={handleClose}*/}
        {/*>*/}
        {/*  <div id="modal-qr" className={classes.containerModal}>*/}
        {/*    <div className={classes.barcodeModal}>*/}
        {/*      <div className={classes.iconClose}>*/}
        {/*        <CloseIcon onClick={handleClose} />*/}
        {/*      </div>*/}
        {/*      <Barcode qr={open.qr} data={open.data} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Modal>*/}

        {/*<Modal*/}
        {/*  aria-labelledby="simple-modal-title"*/}
        {/*  aria-describedby="simple-modal-description"*/}
        {/*  open={openEdit}*/}
        {/*  onClose={handleCloseEdit}*/}
        {/*>*/}
        {/*  <div id="modal-form">*/}
        {/*    <ModalFormEdit*/}
        {/*      create={true}*/}
        {/*      closeModal={handleCloseEdit}*/}
        {/*      data={data[currentIndex]}*/}
        {/*      deletePackage={_deletePackage}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</Modal>*/}
      </Paper>
    </div>
  );
}
