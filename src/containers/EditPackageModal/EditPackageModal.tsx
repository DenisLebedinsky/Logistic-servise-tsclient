import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './EditPackageModal.module.scss';
import { TextField, Button } from '@material-ui/core';

import { getLocations } from 'redux/reducers/locations/actions';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import { updatePackage } from 'redux/reducers/packages/actions';
import { getAuth } from 'redux/reducers/auth/selectors';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/AddCircle';
import AutoSelectLocation from 'components/Locations/AutoSelectLocation';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { EditPackageModalFC } from './types';
import { PackageEditable } from 'redux/reducers/packages/types';

const ModalFormEdit: React.FC<EditPackageModalFC> = ({
  data,
  closeModal,
  deletePackage
}) => {
  const editData: PackageEditable = { ...data };

  let dataItems = data.inventory
    ? data.inventory.map(el => ({ title: el.title, count: el.count }))
    : [];

  let resiver = '';
  if (data.resiverId.hasOwnProperty('title')) {
    resiver = data.resiverId['title'];
  }

  let transit = '';

  if (data.transit.length > 0 && data.transit[0].sendLocId) {
    transit = data.transit[0].sendLocId.title;
  }

  const dispatch = useDispatch();
  const locationsState = useSelector(getLocationsFromState);
  const { user } = useSelector(getAuth);
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

  const getLoc = async () => {
    dispatch(getLocations);
  };

  useEffect(() => {
    if (locationsState.locations.length === 0) {
      getLoc();
    }
  });

  const sendData = () => async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    //if (stateInput.single) {

    editData.resiverId = stateInput.single;

    if (data.transit && data.transit.length > 0 && editData.transit[0]) {
      if (stateInput.popper !== '') {
        editData.transit[0].sendLocId = { title: stateInput.popper };
      }
      editData.transit[0].sendLocId =
        stateInput.popper !== '' ? { title: stateInput.popper } : '';
    } else if (stateInput.popper !== '') {
      editData.transit = [
        {
          sendLocId: {
            title: stateInput.popper
          }
        }
      ];
    } else {
      editData.transit = [];
    }

    editData.inventory = items;

    dispatch(updatePackage(user.token, editData));
    // if (res !== 'error') {
    setReadOnly({ status: true, qr: '13123' });
    // }
  };

  const changeTitle = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeCount = () => (evant: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(evant.target.value));
  };

  const addItem = () => {
    if (title !== '' && count !== 0) {
      const newItems = items.concat({ title, count });

      setItems(newItems);
      setCount(1);
      setTitle('');
    }
  };

  const delItem = (index: number) => {
    const newItems = items.filter((el, i) => i !== index);
    setItems(newItems);
  };

  const handleClose = () => {
    closeModal();
  };

  const suggestions = locationsState.locations.map(loc => ({
    label: loc.title
  }));

  return (
    <form
      id="form-create"
      className={styles.container}
      noValidate
      autoComplete="off"
      onSubmit={sendData}
    >
      <div className={styles.formContainer}>
        <div className={styles.closeIcon}>
          <h2>Опись отправления (редактирование)</h2>
          <CloseIcon onClick={handleClose} />
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
            <div className={styles.itemInput}>
              <TextField
                id="outlined-login"
                label="Номенклатура"
                className={styles.textFieldTitle}
                value={title}
                onChange={changeTitle}
                variant="outlined"
              />
              <TextField
                id="outlined-login"
                label="шт."
                type="number"
                className={styles.textFieldCount}
                value={count}
                onChange={changeCount}
                variant="outlined"
              />
              <AddCircle
                color="secondary"
                className={styles.icon}
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
            {items.map((item, i: number) => (
              <ListItem key={`item_${i}`}>
                <ListItemText primary={item.title} />

                <div className={styles.count}>{item.count}</div>

                {!readOnly.status && <CancelIcon onClick={() => delItem(i)} />}
              </ListItem>
            ))}
          </List>
        </div>
        {!readOnly.status && (
          <div className={styles.footer}>
            <Button
              variant="contained"
              color="secondary"
              className={styles.qrElement}
              onClick={() => deletePackage(data._id)}
            >
              Удалить
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.button}
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
