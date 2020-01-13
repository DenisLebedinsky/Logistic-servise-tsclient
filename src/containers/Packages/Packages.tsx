import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPackagesFromState } from '../../redux/reducers/packages/selectors';
import { getPackages } from '../../redux/reducers/packages/actions';
import { getAuth } from '../../redux/reducers/auth/selectors';
import { PackageType, Package } from '../../redux/reducers/packages/types';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import Modal from '@material-ui/core/Modal';
import styles from './Packages.module.scss';

import BarcodeModal from '../../components/Packages/BarcodeModal';

export default function Packages() {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const data: PackageType = useSelector(getPackagesFromState);

  const [openEdit, setOpenEdit] = useState(false);
  const [currentIndex, setCurrentIndex] = useState('');

  const fetchData = () => {
    dispatch(getPackages(auth.user.token, 0, 10));
  };

  //data, getData, role, id, locations

  const openModal = (e: React.MouseEvent) => {
    //open modal
  };

  const handleOpenEdit = (index: number) => {
    setCurrentIndex(index);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    fetchData();
    setOpenEdit(false);
  };

  const handleOpen = async (packageItem: Package) => {
    // const qr = await getBarcode(item._id);
    // const data = {
    //   location: item.sendLocationId && item.sendLocationId.title,
    //   resiveLoc: item.resiverId && item.resiverId.title
    // };
    // setOpen({ state: true, qr: qr, id: item._id, data });
  };

  const converStatus = (status: string) => {
    if (status === 'inProcess') {
      return 'отправлено';
    }
    if (status === 'accepted') {
      return 'принято';
    }
    if (status === 'notSent') {
      return 'не отправлено';
    }
    return status;
  };

  const setClassnameIventory = (i: number) => {
    if (i % 2 !== 0) {
      return styles.rowGrey;
    }
    return '';
  };

  const statusClass = (status: string): string => {
    if (status === 'accepted') {
      return styles.StatusDelivered;
    }

    return '';
  };

  useEffect(() => {
    if (!data.packages.length) {
      fetchData();
    }
  });

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
            {data.packages.map((packageItem, indexRow) => (
              <TableRow
                key={packageItem._id}
                className={setClassnameIventory(indexRow)}
              >
                <TableCell align="left" component="th" scope="row">
                  {packageItem.number}
                </TableCell>
                <TableCell align="left">
                  {moment(packageItem.created).format('DD.MM.YYYY  HH:mm')}
                </TableCell>
                <TableCell align="left">
                  {packageItem.sendUserId && packageItem.sendUserId.name}
                </TableCell>
                <TableCell align="left">
                  {packageItem.resiverId && packageItem.resiverId.title}
                </TableCell>
                <TableCell align="left">
                  {packageItem.factResiverId && packageItem.factResiverId.title}
                </TableCell>
                <TableCell align="left">
                  {packageItem.sendData &&
                    moment(packageItem.sendData).format('DD.MM.YYYY HH:mm')}
                </TableCell>
                <TableCell align="left">
                  {packageItem.resiveData &&
                    moment(packageItem.resiveData).format('DD.MM.YYYY  HH:mm')}
                </TableCell>
                <TableCell align="center">
                  {packageItem.recipientId && packageItem.recipientId.name}
                </TableCell>

                <TableCell className={styles.cellInventory} align="left">
                  {packageItem.inventory.map((el, i) => (
                    <div
                      key={el._id}
                      className={
                        packageItem.inventory.length - 1 === i
                          ? styles.lastList
                          : styles.list
                      }
                    >
                      <div>{el.title}</div>
                      <div>({el.count} )</div>
                    </div>
                  ))}
                </TableCell>

                <TableCell align="center">
                  {packageItem.transit.map((el, i) => (
                    <div
                      key={el._id}
                      className={
                        packageItem.transit.length - 1 === i
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
                            {moment(el.resivedDate).format('DD.MM.YYYY  HH:mm')}
                          </span>
                        )}
                      </div>
                      <div className={styles.transitBlock3}>
                        {el.date && moment(el.date).format('DD.MM.YYYY  HH:mm')}
                      </div>
                      <div className={styles.transitBlock2}>
                        {el.userId && el.userId.name}
                      </div>
                    </div>
                  ))}
                </TableCell>

                <TableCell
                  align="center"
                  className={statusClass(packageItem.status)}
                >
                  {converStatus(packageItem.status)}
                </TableCell>

                <TableCell align="left">{packageItem.comment}</TableCell>

                <TableCell align="center">
                  <div className={styles.actions}>
                    {(id === packageItem.sendUserId &&
                      packageItem.status === 'notSent') ||
                    role === 'admin' ? (
                      <EditIcon
                        className={styles.action}
                        onClick={() => handleOpenEdit(indexRow)}
                      />
                    ) : null}
                    <FileIcon
                      className={styles.action}
                      onClick={() => handleOpen(packageItem)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open.state}
          onClose={handleClose}
        >
          <BarcodeModal open={} handleClose={handleClose}></BarcodeModal>
        </Modal>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openEdit}
          onClose={handleCloseEdit}
        >
          <div id="modal-form">
            <ModalFormEdit
              create={true}
              closeModal={handleCloseEdit}
              data={data[currentIndex]}
              deletePackage={_deletePackage}
            />
          </div>
        </Modal>
      </Paper>
    </div>
  );
}
