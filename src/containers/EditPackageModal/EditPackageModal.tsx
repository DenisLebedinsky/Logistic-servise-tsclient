import React, { useState, useEffect, SyntheticEvent } from 'react';
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

const ModalFormEdit: React.FC<EditPackageModalFC> = ({
  data,
  closeModal,
  deletePackage
}) => {
  let dataItems = data.inventory
    ? data.inventory.map(el => ({ title: el.title, count: el.count }))
    : [];

  const resiver = data.resiverId ? data.resiverId.title : '';

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

  useEffect(() => {
    if (locationsState.locations.length === 0) {
      getLoc();
    }
  });

  const getLoc = async () => {
    dispatch(getLocations);
  };

  const sendData = async (e: SyntheticEvent) => {
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

    dispatch(updatePackage(user.token, data));
    // if (res !== 'error') {
    setReadOnly({ status: true, qr: res.qr });
    // }
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

  const suggestions = locationsState.locations.map(loc => ({
    label: loc.title
  }));

  return (
    <form
      id="form-create"
      className={styles.container}
      noValidate
      autoComplete="off"
      onSubmit={e => sendData(e)}
    >
      <div className={styles.formContainer}>
        <div className={styles.closeIcon}>
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
            <div className={styles.itemInput}>
              <TextField
                id="outlined-login"
                label="Номенклатура"
                className={styles.textFieldTitle}
                value={title}
                onChange={e => changeTitle(e)}
                variant="outlined"
              />
              <TextField
                id="outlined-login"
                label="шт."
                type="number"
                className={styles.textFieldCount}
                value={count}
                onChange={e => changeCount(e)}
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
