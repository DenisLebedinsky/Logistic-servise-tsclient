import { Button, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircle from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';

import React, { ChangeEvent, useEffect, useState } from 'react';
//import AutoSelectLocation from 'components/Locations/AutoSelectLocation';
import Barcode from 'containers/Barcode';
import { useDispatch, useSelector } from 'react-redux';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import { getResultAdding } from 'redux/reducers/packages/selectors';
import { getLocations } from 'redux/reducers/locations/actions';
import { addPackage } from 'redux/reducers/packages/actions';
import { Item, ReadOnly } from 'redux/reducers/packages/types';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { CreatePackageModalFC } from './types';
import styles from './CreatePackageModal.module.scss';
import './CreatePackage.scss';

const ModalForm: React.FC<CreatePackageModalFC> = ({
  create,
  closeModal,
  auth
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(1);
  const [created, setCreated] = useState(false);
  const [readOnly, setReadOnly] = useState<ReadOnly>({
    status: false,
    qr: '',
    id: ''
  });
  // const [stateInput, setStateInput] = useState({
  //   single: '',
  //   popper: ''
  // });

  //адрес получателя
  const [reciverId, setReciverId] = useState('');
  // первый транзитный пункт
  const [sendLocIdTitle, setSendLocIdTitle] = useState('');

  const locationsData = useSelector(getLocationsFromState);
  const resultAdding = useSelector(getResultAdding);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!locationsData.locations.length && !locationsData.loading) {
      dispatch(getLocations(auth.user.token, 0, 1000));
    }
  });

  useEffect(() => {
    console.log(resultAdding);
    if (created && resultAdding) {
      console.log(123123);
      setReadOnly({
        qr: resultAdding.qr || '',
        status: true,
        id: resultAdding._id
      });
      setCreated(false);
    }
  });

  const getReciverId = () => {
    return (
      locationsData.locations.find(location => location.title === reciverId)
        ?.title || ''
    );
  };

  // const getsendLocId = () => {
  //   return (
  //     locationsData.locations.find(
  //       location => location.title === sendLocIdTitle
  //     )?._id || ''
  //   );
  // };

  const sendData = () => {
    if (reciverId) {
      const transit =
        sendLocIdTitle !== ''
          ? [
              {
                date: undefined,
                sendLocId: { title: sendLocIdTitle },
                sendfactLocId: undefined,
                userId: undefined
              }
            ]
          : [];
      const data = {
        reciverId: getReciverId(),
        transit,
        inventory: items,
        sendLocationId: auth.user.locationId,
        sendUserId: auth.user.id
      };

      dispatch(addPackage(auth.user.token, data));
      setCreated(true);
    }
  };

  const changeReciverId = (event: ChangeEvent<{}>, value: string | null) => {
    if (value) {
      setReciverId(value);
    }
  };

  const changeSendLocId = (event: ChangeEvent<{}>, value: string | null) => {
    if (value) {
      setSendLocIdTitle(value);
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeCount = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(parseInt(e.target.value, 10));
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

  const getReciveLoc = () => {
    const res = locationsData.locations.find(
      el => el._id === reciverId || el.title === reciverId
    );

    if (res) {
      return res.title;
    }

    return reciverId;
  };

  const getUserLocation = () => {
    const userLocation = auth.user.locationId;
    if (userLocation) {
      const res = locationsData.locations.find(el => el._id === userLocation);
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
    >
      <div className={styles.formContainer}>
        <div className={styles.closeIcon}>
          <h2>
            Опись отправления
            {create && '(создание)'}
          </h2>
          <CloseIcon onClick={handleCloseModal} />
        </div>

        {readOnly.status && (
          <Barcode
            data={{
              id: readOnly.id,
              qr: readOnly.qr,
              location: getUserLocation(),
              reciveLoc: getReciveLoc()
            }}
          />
        )}

        {readOnly.status ? (
          <div>
            <span>Адрес получателя:</span>
            <h3>{reciverId}</h3>
            <span>Первый транзитный пункт:</span>
            <h3>{sendLocIdTitle}</h3>
          </div>
        ) : (
          <div>
            <Autocomplete
              freeSolo
              id="reciverId"
              disableClearable
              onChange={changeReciverId}
              options={locationsData.locations.map(option => option.title)}
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
              onChange={changeSendLocId}
              options={locationsData.locations.map(option => option.title)}
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
          // <AutoSelectLocation
          //   suggestions={suggestions}
          //   stateInput={stateInput}
          //   setStateInput={setStateInput}
          // />
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
              type="button"
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={sendData}
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
