import { Button, Container, TextField } from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginStart } from '../../redux/reducers/auth/actions';
import { getAuth } from '../../redux/reducers/auth/selectors';

import styles from './Authentication.module.scss';

export default function Authentication() {
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector(getAuth);

  const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlogin(e.target.value);
  };
  const changePass = (e: any) => {
    setPassword(e.target.value);
  };

  const sendData = (e: any) => {
    e.preventDefault();
    setErrors(false);
    setLoading(true);
    dispatch(loginStart({ username: login, password }));
  };

  useEffect(() => {
    console.log(auth);
    if (auth.error) {
      setErrors(true);
    }
  });

  return (
    <Container maxWidth="sm">
      <form
        className={styles.container}
        noValidate
        autoComplete="off"
        onSubmit={sendData}
      >
        {loading ? (
          <div>loading ...</div>
        ) : (
          <>
            <TextField
              id="outlined-login"
              label="Логин"
              className={styles.textField}
              value={login}
              onChange={changeLogin}
              margin="normal"
              variant="outlined"
              error={error}
            />
            <TextField
              id="outlined-password-input"
              label="Пароль"
              type="password"
              onChange={changePass}
              className={styles.textField}
              margin="normal"
              variant="outlined"
              value={password}
              autoComplete="off"
              error={error}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.button}
            >
              Войти
            </Button>
          </>
        )}
      </form>
    </Container>
  );
}
