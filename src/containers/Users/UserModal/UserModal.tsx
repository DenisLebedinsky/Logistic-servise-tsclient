import { Button, TextField } from '@material-ui/core';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'redux/reducers/auth/selectors';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import { getLocations } from 'redux/reducers/locations/actions';
import { addUser, updateUser } from 'redux/reducers/users/actions';

import { UserModal, EditUser } from './types';
import styles from './UserModal.module.scss';

const ModalForm: React.FC<UserModal> = ({ closeModal, editUser }) => {
  const initialUser: EditUser = {
    name: '',
    nameErr: false,
    login: '',
    loginErr: false,
    password: '',
    pswErr: false,
    phone: '',
    role: 'user',
    locationId: '',
    locationIdErr: false
  };

  const dispatch = useDispatch();
  const locationsData = useSelector(getLocationsFromState);
  const auth = useSelector(getAuth);

  const edit = editUser._id !== '';

  if (edit) {
    initialUser.name = editUser.name;
    initialUser.login = editUser.login;
    initialUser.phone = editUser.phone;
    initialUser.role = editUser.role;
    initialUser.locationId = editUser.locationId;
  }
  const [user, setUser] = useState(initialUser);

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  useEffect(() => {
    if (
      !locationsData.error &&
      !locationsData.loading &&
      !locationsData.locations.length
    )
      dispatch(getLocations(auth.user.token, 0, 1000));
  }, [locationsData]);

  const checkfill = () => {
    return {
      nameErr: user.name === '',
      loginErr: user.login === '',
      pswErr: user.password === '',
      phoneErr: user.phone === '',
      locationIdErr: user.locationId === ''
    };
  };

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const dataErr = checkfill();

    if (
      !edit &&
      (dataErr.nameErr ||
        dataErr.loginErr ||
        dataErr.pswErr ||
        dataErr.phoneErr)
    ) {
      setUser({ ...user, ...dataErr });
    } else {
      const newUser = {
        name: user.name,
        login: user.login,
        password: user.password,
        phone: user.phone,
        role: user.role,
        locationId: user.locationId
      };

      if (edit) {
        dispatch(updateUser(auth.user.token, { ...newUser, id: editUser._id }));
      } else {
        dispatch(addUser(auth.user.token, newUser));
      }
      closeModal();
    }
  };

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: event.target.value, nameErr: false });
  };

  const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, login: event.target.value, loginErr: false });
  };

  const changePassword = (event: React.ChangeEvent<{ value: string }>) => {
    setUser({ ...user, password: event.target.value, pswErr: false });
  };

  const changePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, phone: event.target.value });
  };

  const changeRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUser({ ...user, role: `${event.target.value}` });
  };

  const changeLocation = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUser({ ...user, locationId: `${event.target.value}` });
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.headerModal}>
        <Typography variant="h6">
          {editUser.hasOwnProperty('_id')
            ? 'Изменение пользоваетеля'
            : 'Создание нового пользователя'}
        </Typography>
        <CloseIcon onClick={handleClose} />
      </div>
      <form
        id="form-create"
        className={styles.container}
        noValidate
        autoComplete="off"
      >
        <div className={styles.formContainer}>
          <div className={styles.itemInput}>
            <TextField
              id="outlined-username"
              label="Имя пользователя"
              type="text"
              className={styles.textField}
              value={user.name}
              onChange={changeUsername}
              variant="outlined"
              error={user.nameErr}
            />
            <TextField
              id="outlined-login"
              label="Логин"
              type="text"
              className={styles.textField}
              value={user.login}
              onChange={changeLogin}
              variant="outlined"
              error={user.loginErr}
            />
            <TextField
              id="outlined-password"
              label={edit ? 'Новый пароль' : 'Пароль'}
              type="text"
              className={styles.textField}
              value={user.password}
              onChange={changePassword}
              variant="outlined"
              error={user.pswErr}
            />
            <TextField
              id="outlined-phone"
              label="телефон"
              type="text"
              className={styles.textField}
              value={user.phone}
              onChange={changePhone}
              variant="outlined"
            />
            <div>
              <FormControl
                variant="outlined"
                className={styles.formControl}
                error={user.locationIdErr}
              >
                <InputLabel ref={inputLabel}>Локация</InputLabel>
                <Select
                  value={user.locationId}
                  onChange={changeLocation}
                  labelWidth={labelWidth}
                >
                  {locationsData.locations &&
                    locationsData.locations.map(option => (
                      <MenuItem key={option.title} value={option.title}>
                        {option.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={styles.formControl}>
                <InputLabel ref={inputLabel}>Роль</InputLabel>
                <Select
                  value={user.role}
                  onChange={changeRole}
                  labelWidth={labelWidth}
                >
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="user">user</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles.footer}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              className={styles.button}
              onClick={sendData}
            >
              {edit ? 'Изменить' : 'Создать'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;
