import React, { useState, useEffect } from 'react';
import styles from './EditPackagesModal';
import { TextField, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/AddCircle';
import AutoSelectLocation from './AuotoSelectLocation.jsx';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';

const ModalFormEdit = ({ data, closeModal, deletePackage }) => {
  let dataItems = data.inventory
    ? data.inventory.map(el => ({ title: el.title, count: el.count }))
    : [];

  const resiver = data.resiverId ? data.resiverId.title : '';

  let transit = '';

  if (data.transit.length > 0 && data.transit[0].sendLocId) {
    transit = data.transit[0].sendLocId.title;
  }

  const classes = useStyles();

  const [items, setItems] = useState(dataItems);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(1);
  const [readOnly, setReadOnly] = useState({
    status: false,
    qr: ''
  });
  const [stateInput, setStateInput] = React.useState({
    single: resiver,
    popper: transit
  });
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (locations.length === 0) {
      getLoc();
    }
  });

  const getLoc = async () => {
    setLocations(await getLocations());
  };

  const sendData = async e => {
    e.preventDefault();

    //if (stateInput.single) {

    data.resiverId = stateInput.single;

    if (data.transit && data.transit.length > 0) {
      data.transit[0].sendLocId =
        stateInput.popper !== '' ? { title: stateInput.popper } : undefined;
    } else {
      data.transit =
        stateInput.popper !== ''
          ? [{ sendLocId: { title: stateInput.popper } }]
          : [];
    }

    data.inventory = items;

    const res = await updatePackage(data);
    if (res !== 'error') {
      setReadOnly({ status: true, qr: res.qr });
    }
  };

  const changeTitle = e => {
    setTitle(e.target.value);
  };

  const changeCount = e => {
    setCount(parseInt(e.target.value));
  };

  const addItem = () => {
    if (title !== '' && count !== 0) {
      const newItems = items.concat({ title, count });

      setItems(newItems);
      setCount('');
      setTitle('');
    }
  };

  const delItem = index => {
    const newItems = items.filter((el, i) => i !== index);
    setItems(newItems);
  };

  const suggestions = locations.map(loc => ({ label: loc.title }));

  return (
    <form
      id="form-create"
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={e => sendData(e)}
    >
      <div className={classes.formContainer}>
        <div className={classes.closeIcon}>
          <h2>Опись отправления (редактирование)</h2>
          <CloseIcon onClick={closeModal} />
        </div>

        {readOnly.status ? (
          <div>
            <span>Адрес получателя:</span>
            <h3>{stateInput.single}</h3>
            <span>Первый транзитный пункт:</span>
            <h3>{stateInput.popper}</h3>
          </div>
        ) : (
          <AutoSelectLocation
            suggestions={suggestions}
            stateInput={stateInput}
            setStateInput={setStateInput}
          />
        )}

        <div>
          <span>Опись вложения:</span>
          {!readOnly.status && (
            <div className={classes.itemInput}>
              <TextField
                id="outlined-login"
                label="Номенклатура"
                className={classes.textFieldTitle}
                value={title}
                onChange={e => changeTitle(e)}
                variant="outlined"
              />
              <TextField
                id="outlined-login"
                label="шт."
                type="number"
                className={classes.textFieldCount}
                value={count}
                onChange={e => changeCount(e)}
                variant="outlined"
              />
              <AddCircle
                color="secondary"
                className={classes.icon}
                fontSize="large"
                onClick={addItem}
              />
            </div>
          )}
          <List
            component="nav"
            aria-label="secondary mailbox folders"
            style={{ maxHeight: 300, overflow: 'auto' }}
          >
            {items.map((item, i) => (
              <ListItem key={`item_${i}`}>
                <ListItemText primary={item.title} />

                <div className={classes.count}>{item.count}</div>

                {!readOnly.status && <CancelIcon onClick={() => delItem(i)} />}
              </ListItem>
            ))}
          </List>
        </div>
        {!readOnly.status && (
          <div className={classes.footer}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.qrElement}
              onClick={() => deletePackage(data._id)}
            >
              Удалить
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              изменить
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ModalFormEdit;
