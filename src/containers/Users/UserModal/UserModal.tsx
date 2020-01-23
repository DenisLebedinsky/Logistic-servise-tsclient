import { Button, FormHelperText, TextField } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'redux/reducers/auth/selectors';
import { getLocationsFromState } from 'redux/reducers/locations/selectors';
import { getLocations } from 'redux/reducers/locations/actions';
import { addUser, updateUser } from 'redux/reducers/users/actions';

import { UserModal } from './types';
import styles from './UserModal.module.scss';

type Location = {
  _id: '';
  title: '';
};

type EditUser = {
  name: string;
  nameErr: boolean;
  login: string;
  loginErr: boolean;
  password: string;
  pswErr: boolean;
  phone: string;
  role: string;
  locationId: Location | string;
};

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
    locationId: {
      _id: '',
      title: ''
    }
  };

  const dispatch = useDispatch();
  const locationsData = useSelector(getLocationsFromState);
  const auth = useSelector(getAuth);

//  const edit = editUser.hasOwnProperty('_id');

//   if (edit) {
//     initialUser.name = editUser.name;
//     initialUser.login = editUser.login;
//     initialUser.phone = editUser.phone;
//     initialUser.role = editUser.role;
//     initialUser.locationId = editUser.locationId;
//   }

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (locationsData.locations.length === 0) {
      dispatch(getLocations(auth.user.token, 0, 1000));
    }
  });

//   const checkfill = () => {
//     return {
//       nameErr: user.name === '',
//       loginErr: user.login === '',
//       pswErr: user.password === '',
//       phone: user.phone === '',
//       locationId: user.locationId === ''
//     };
//   };

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const dataErr = checkfill();

    if (
      !edit &&
      (dataErr.nameErr || dataErr.loginErr || dataErr.pswErr || dataErr.phone)
    ) {
      setUser({ ...user, ...dataErr });
    } else {
      let res;

      if (edit) {
        user.id = editUser._id;

        dispatch(updateUser(auth.user.token, user));
      } else {
        dispatch(addUser(auth.user.token, user));
      }
      if (res !== 'erroe') {
        closeModal();
      }
    }
  };

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: event.target.value, nameErr: false });
  };

  const changeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, login: event.target.value, loginErr: false });
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: event.target.value, pswErr: false });
  };

  const changePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, phone: event.target.value });
  };

  const changeRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, role: event.target.value });
  };

  const changeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, locationId: event.target.value });
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
        onSubmit={e => sendData(e)}
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
              id="outlined-login"
              label={edit ? 'Новый пароль' : 'Пароль'}
              type="text"
              className={styles.textField}
              value={user.password}
              onChange={changePassword}
              variant="outlined"
              error={user.pswErr}
            />
            <TextField
              id="outlined-login"
              label="телефон"
              type="text"
              className={styles.textField}
              value={user.phone}
              onChange={changePhone}
              variant="outlined"
            />
            <div>
              <FormControl className={styles.formControl}>
                <FormHelperText>Лока</FormHelperText>
                <Select
                  value={user.locationId}
                  onChange={changeLocation}
                  input={
                    <OutlinedInput name="Локация" id="outlined-age-simple" />
                  }
                >
                  {locations &&
                    locations.map(option => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl className={styles.formControl}>
                <FormHelperText>Роль</FormHelperText>
                <Select
                  value={user.role}
                  onChange={changeRole}
                  input={<OutlinedInput name="Роль" id="outlined-age-simple" />}
                >
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="user">user</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={styles.footer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.button}
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
