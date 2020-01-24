import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button"
import CloseIcon from "@material-ui/icons/Close";
import LocationsModal from "./LocationsModal";
import { useDispatch, useSelector } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import { getAuth } from 'redux/reducers/auth/selectors';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";

function Locations() {
  const dispatch = useDispatch();
  const locationData = useSelector(getLocationsFromState);
  const auth = useSelector(getAuth);

  const [open, setOpen] = useState(false);
  const [editLoc, setEditLoc] = useState(false);

  const handleOpen = newLoc => {
    setEditLoc(newLoc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getLocations();
  };

  useEffect(() => {
    if (locations.length === 0) {
      getLocations();
    }
  });

  const getLocations = async () => {
    //setLocations(await api.getLocations(token));
  };


  const setClassnameIventory = i => {
    if (i % 2 !== 0) return styles.rowGrey;

    return "";
  };

  const showModal = item => () => {
    openModal(item);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Создать локацию
      </Button>

      <Paper className={styles.root}>
        <Table className={styles.table} style={{ borderColor: "black" }}>
          <TableHead>
            <TableRow>
              <TableCell className={styles.cellNumber}>Номер</TableCell>
              <TableCell align="left">Название</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data.map((item, indexRow) => (
                <TableRow
                  key={item._id}
                  className={setClassnameIventory(indexRow)}
                >
                  <TableCell component="th" scope="row">
                    {indexRow + 1}
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left" className={styles.del}>
                    {/* <CancelIcon onClick={() => delLocation(item._id)} /> */}
                    <EditIcon
                      onClick={showModal(item)}
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
                {editLoc.hasOwnProperty("_id")
                  ? "Изменение локации"
                  : "Создание новой локации"}
              </Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <LocationsModal
              token={token}
              closeModal={handleClose}
              getLocations={getLocations}
              editLoc={editLoc}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Locations;