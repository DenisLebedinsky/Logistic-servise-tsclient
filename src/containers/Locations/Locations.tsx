import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import LocationsModal from './LocationsModal';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { getAuth } from 'redux/reducers/auth/selectors';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { Location } from 'redux/reducers/locations/types';
import { getLocations } from 'redux/reducers/locations/actions';
import styles from './Locations.module.scss';

function Locations() {
  const dispatch = useDispatch();
  const LocationsData = useSelector(getLocationsFromState);
  const auth = useSelector(getAuth);

  const [open, setOpen] = useState(false);
  const [editLocation, setEditLocation] = useState({ _id: '', title: '' });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEdit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    location: Location
  ) => {
    setEditLocation(location);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      !LocationsData.error &&
      !LocationsData.loading &&
      LocationsData.locations.length === 0
    ) {
      dispatch(getLocations(auth.user.token, 0, 1000));
    }
  });

  const setClassnameIventory = (i: number) => {
    if (i % 2 !== 0) return styles.rowGrey;

    return '';
  };

  return (
    <div className={styles.locations}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Создать локацию
      </Button>

      <Paper className={styles.root}>
        <Table
          className={styles.table}
          style={{ borderColor: 'black' }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell className={styles.cellNumber}>Номер</TableCell>
              <TableCell align="left">Название</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {LocationsData.locations.map((item, indexRow) => (
              <TableRow
                key={item._id}
                className={setClassnameIventory(indexRow)}
              >
                <TableCell component="th" scope="row">
                  {indexRow + 1}
                </TableCell>
                <TableCell align="left">{item.title}</TableCell>
                <TableCell align="left">
                  <EditIcon
                    onClick={e => handleOpenEdit(e, item)}
                    className={styles.actionEdit}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div id="modal-qr" className={styles.containerModal}>
          <div className={styles.Modal}>
            <div className={styles.headerModal}>
              <Typography variant="h6">
                {editLocation._id !== ''
                  ? 'Изменение локации'
                  : 'Создание новой локации'}
              </Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <LocationsModal
              closeModal={handleClose}
              editLocation={editLocation}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Locations;
