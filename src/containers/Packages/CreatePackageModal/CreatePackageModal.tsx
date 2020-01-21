import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/AddCircle';
import AutoSelectLocation from 'components/Locations/AutoSelectLocation';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import Barcode from 'containers/Barcode';
import styles from './CreatePackageModal.module.scss';
import { CreatePackageModalFC } from './types';

import { useDispatch, useSelector } from 'react-redux';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import { getLocations } from 'redux/reducers/locations/actions';
import { addPackage } from 'redux/reducers/packages/actions';

type Item = {
  title: string;
  count: number;
};

const ModalForm: React.FC<CreatePackageModalFC> = ({
  create,
  closeModal,
  auth
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(1);
  const [readOnly, setReadOnly] = useState({
    status: false,
    qr: ''
  });
  const [stateInput, setStateInput] = React.useState({
    single: '',
    popper: ''
  });

  const { locations } = useSelector(getLocationsFromState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!locations.length) {
      dispatch(getLocations(auth.user.token, 0, 1000));
    }
  });

  const sendData = () => async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (stateInput.single) {
      const transit =
        stateInput.popper !== ''
          ? [
              {
                date: undefined,
                sendLocId: { title: stateInput.popper },
                sendfactLocId: undefined,
                userId: undefined
              }
            ]
          : [];
      const data = {
        resiverId: stateInput.single,
        transit: transit,
        inventory: items,
        sendLocationId: auth.user.token
      };

      dispatch(addPackage(auth.user.token, data));
      //   const res = await createPackage(data, token);
      //   if (res !== 'error') {
      //     setReadOnly({ status: true, qr: res.qr });
      //   }
    }
  };

  const handleCloseModal = () => () => {
    closeModal();
  };

  const changeTitle = () => (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeCount = () => (e: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(e.target.value));
  };

  const addItem = () => {
    if (title !== '' && count !== 0) {
      const newItems = items.concat({ title, count });

      setItems(newItems);
      setCount(0);
      setTitle('');
    }
  };

  const delItem = (index: number) => {
    const newItems = items.filter((el, i) => i !== index);
    setItems(newItems);
  };

  const suggestions = locations.map(loc => ({ label: loc.title }));

  const getResiveLoc = () => {
    const res = locations.find(
      el => el._id === stateInput.single || el.title === stateInput.single
    );

    if (res) {
      return res.title;
    }

    return stateInput.single;
  };

  const getUserLocation = () => {
    const userLocation = auth.user.locationId;
    if (userLocation) {
      const res = locations.find(el => el._id === userLocation);
      if (res) {
        return res.title;
      }
    }
    return '';
  };

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
          <h2>Опись отправления {create && '(создание)'}</h2>
          <CloseIcon onClick={handleCloseModal} />
        </div>

        {readOnly.status && (
          <Barcode
            data={{
              qr: readOnly.qr,
              location: getUserLocation(),
              resiveLoc: getResiveLoc()
            }}
          />
        )}

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
            {items.map((item, i) => (
              <ListItem key={`item_${i}`}>
                <ListItemText primary={`${item.title}`} />

                <div className={styles.count}>{item.count}</div>

                {!readOnly.status && <CancelIcon onClick={() => delItem(i)} />}
              </ListItem>
            ))}
          </List>
        </div>
        {!readOnly.status && (
          <div className={styles.footer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.button}
            >
              Создать
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ModalForm;
