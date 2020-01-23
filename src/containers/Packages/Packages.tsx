import moment from 'moment';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import EditIcon from '@material-ui/icons/Edit';
import Fade from '@material-ui/core/Fade';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import Modal from '@material-ui/core/Modal';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Package, PackageType } from 'redux/reducers/packages/types';
import { getAuth } from 'redux/reducers/auth/selectors';
import { getPackages } from 'redux/reducers/packages/actions';
import { getPackagesFromState } from 'redux/reducers/packages/selectors';
import BarcodeModal from 'containers/Packages/BarcodeModal';
import Error from 'components/Error';
import CreatePackageModal from 'containers/Packages/CreatePackageModal';

import EditPackageModal from './EditPackageModal';
import styles from './Packages.module.scss';

export default function Packages() {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const data: PackageType = useSelector(getPackagesFromState);

  const [modalData, setModalData] = useState({
    location: '',
    resiveLoc: '',
    id: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowEditModal] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const fetchData = (skip: number, limit: number) => {
    dispatch(getPackages(auth.user.token, skip, limit));
  };

  const deletePackage = async (id: string) => {
    await deletePackage(id);
    setShowEditModal(false);
    fetchData(0, rowsPerPage);
  };

  // edit modal
  const handleOpenEdit = (index: number) => {
    setCurrentIndex(index);
    setShowEditModal(true);
  };

  const closeEdit = () => {
    setShowEditModal(false);
    fetchData(0, rowsPerPage);
  };

  // modal
  const handleOpenModalBarcode = async (packageItem: Package) => {
    setModalData({
      id: packageItem._id,
      location: packageItem.sendLocationId && packageItem.sendLocationId.title,
      resiveLoc: packageItem.resiverId && packageItem.resiverId.title
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //---------

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchData(newPage * rowsPerPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rows = parseInt(event.target.value, 10);
    setRowsPerPage(+event.target.value);
    setPage(0);
    fetchData(page * rows, rows);
  };

  // create modal
  const openCreateModal = () => {
    setShowModalCreate(true);
  };

  const closeCreateModal = () => {
    setShowModalCreate(false);
  };

  useEffect(() => {
    if (!data.packages.length && !data.error) {
      fetchData(0, rowsPerPage);
    }
  }, [data.packages]);

  return (
    <div className={styles.container}>
      {data.loading ? (
        <div className={styles.spiner}>
          <CircularProgress />
          {!data.loading && data.error && (
            <Error msg="Не удалось загрузить данные" />
          )}
        </div>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={openCreateModal}>
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
                      {packageItem.factResiverId &&
                        packageItem.factResiverId.title}
                    </TableCell>
                    <TableCell align="left">
                      {packageItem.sendData &&
                        moment(packageItem.sendData).format('DD.MM.YYYY HH:mm')}
                    </TableCell>
                    <TableCell align="left">
                      {packageItem.resiveData &&
                        moment(packageItem.resiveData).format(
                          'DD.MM.YYYY  HH:mm'
                        )}
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
                          <div>({el.count})</div>
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
                      className={statusClass(packageItem.status)}
                    >
                      {converStatus(packageItem.status)}
                    </TableCell>

                    <TableCell align="left">{packageItem.comment}</TableCell>

                    <TableCell align="center">
                      <div className={styles.actions}>
                        {packageItem.status === 'notSent' && (
                          <EditIcon
                            className={styles.action}
                            onClick={() => handleOpenEdit(indexRow)}
                          />
                        )}
                        <FileIcon
                          className={styles.action}
                          onClick={() => handleOpenModalBarcode(packageItem)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage="записей на странице"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to === -1 ? count : to} из ${count}`
            }
          />
        </>
      )}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showModal}
        onClose={closeModal}
        className={styles.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={showModal}>
          <div>
            <BarcodeModal data={modalData} closeModal={closeModal} />
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showModalEdit}
        onClose={closeEdit}
        className={styles.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={showModalEdit}>
          <div id="modal-form">
            <EditPackageModal
              data={data.packages[currentIndex]}
              closeModal={closeEdit}
              deletePackage={deletePackage}
            />
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={showModalCreate}
        onClose={closeCreateModal}
        className={styles.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={showModalCreate}>
          <div id="modal-form">
            <CreatePackageModal
              create
              closeModal={closeCreateModal}
              auth={auth}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
