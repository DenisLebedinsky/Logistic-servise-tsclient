import { Button, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAuth } from 'redux/reducers/auth/selectors';
import { updatePackage, deletePackage } from 'redux/reducers/packages/actions';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import { getLocations } from 'redux/reducers/locations/actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { PackageEditable } from 'redux/reducers/packages/types';

import styles from './EditPackageModal.module.scss';
import { EditPackageModalFC } from './types';
import { getResultUpdating } from 'redux/reducers/packages/selectors';

const ModalFormEdit: React.FC<EditPackageModalFC> = ({ data, closeModal }) => {
  const editData: PackageEditable = { ...data };

  const dataItems = data.inventory
    ? data.inventory.map(el => ({ title: el.title, count: el.count }))
    : [];

  const dispatch = useDispatch();
  const locationsState = useSelector(getLocationsFromState);
  const resultUpdating = useSelector(getResultUpdating);
  const { user } = useSelector(getAuth);
  const [items, setItems] = useState(dataItems);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(1);
  const [readOnly, setReadOnly] = useState({
    status: false,
    qr: '',
    id: ''
  });

  let initialSendLocIdTitle = '';
  if (data.transit.length && typeof data.transit[0].sendLocId !== 'string') {
    initialSendLocIdTitle = data.transit[0].sendLocId.title;
  }

  let initialResiverId = '';

  if (typeof data.resiverId !== 'string') {
    initialResiverId = data.resiverId.title;
  }

  //адрес получателя
  const [resiverId, setResiverId] = useState(initialResiverId);
  // первый транзитный пункт
  const [sendLocIdTitle, setSendLocIdTitle] = useState(initialSendLocIdTitle);

  const changeResiverId = (event: ChangeEvent<{}>, value: string | null) => {
    if (value) {
      setResiverId(value);
    }
  };

  const changeSendLocId = (event: ChangeEvent<{}>, value: string | null) => {
    if (value) {
      setSendLocIdTitle(value);
    }
  };
  const getLoc = () => {
    dispatch(getLocations(user.token, 0, 1000));
  };

  useEffect(() => {
    if (locationsState.locations.length === 0 && !locationsState.loading) {
      getLoc();
    }
  });

  useEffect(() => {
    if (resultUpdating) {
      setReadOnly({
        qr: resultUpdating.qr || '',
        status: true,
        id: resultUpdating._id
      });
    }
  });

  const sendData = () => {
    editData.resiverId = resiverId;

    if (data.transit && data.transit.length > 0 && editData.transit[0]) {
      if (sendLocIdTitle !== '') {
        editData.transit[0].sendLocId = { title: sendLocIdTitle };
      }
      editData.transit[0].sendLocId =
        sendLocIdTitle !== '' ? { title: sendLocIdTitle } : '';
    } else if (sendLocIdTitle !== '') {
      editData.transit = [
        {
          sendLocId: {
            title: sendLocIdTitle
          }
        }
      ];
    } else {
      editData.transit = [];
    }

    editData.inventory = items;

    dispatch(updatePackage(user.token, editData));
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(event.target.value, 10));
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

  const removePackage = () => {
    dispatch(deletePackage(user.token, data._id));
    closeModal(true);
  };
  // const suggestions = locationsState.locations.map(loc => ({
  //   label: loc.title
  // }));

  return (
    <form
      id="form-create"
      className={styles.container}
      noValidate
      autoComplete="off"
    >
      <div className={styles.formContainer}>
        <div className={styles.closeIcon}>
          <h2>Опись отправления (редактирование)</h2>
          <CloseIcon onClick={handleClose} />
        </div>

        {readOnly.status ? (
          <div>
            <span>Адрес получателя:</span>
            <h3>{resiverId}</h3>
            <span>Первый транзитный пункт:</span>
            <h3>{sendLocIdTitle}</h3>
          </div>
        ) : (
          <div>
            <Autocomplete
              freeSolo
              id="resiverId"
              disableClearable
              value={resiverId}
              onChange={changeResiverId}
              options={locationsState.locations.map(option => option.title)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Адрес получателя"
                  margin="normal"
                  variant="outlined"
                  placeholder="Введите адрес"
                  fullWidth
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
            <Autocomplete
              freeSolo
              id="changeSendLocId"
              disableClearable
              value={sendLocIdTitle}
              onChange={changeSendLocId}
              options={locationsState.locations.map(option => option.title)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Первый транзитный пункт"
                  placeholder="Введите адрес"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
          </div>
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
              onClick={removePackage}
            >
              Удалить
            </Button>

            <Button
              type="button"
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={sendData}
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
