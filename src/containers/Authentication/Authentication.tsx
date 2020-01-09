import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, TextField, Button } from "@material-ui/core";
import styles from "./Authentication.module.scss";
import { login } from "../../redux/reducers/auth/actions";

export default function Authentication() {
  const [login, setlogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const error = false;
  const changeLogin = (e: any) => {
    setlogin(e.target.value);
  };
  const changePass = (e: any) => {
    setPassword(e.target.value);
  };

  const sendData = (e: any) => {
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <form
        className={styles.container}
        noValidate
        autoComplete="off"
        onSubmit={sendData}
      >
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
      </form>
    </Container>
  );
}
