/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { getAuth } from 'redux/reducers/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUserInfo } from 'redux/reducers/auth/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { Auth } from 'redux/reducers/auth/types';
import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const [path, setPath] = useState(0);
  const { history, location } = useReactRouter();
  const auth: Auth = useSelector(getAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.user.token && location.pathname !== '/login') {
      history.push('/login');
    }
  });

  useEffect(() => {
    if (
      auth.user.token &&
      (auth.user.username === '' ||
        auth.user.locationId === '' ||
        auth.user.role === '' ||
        auth.user.id === '')
    ) {
      dispatch(getUserInfo(auth.user.token));
    }
  });

  useEffect(() => {
    if (location.pathname === '/' && path !== 0) {
      setPath(0);
    }

    if (location.pathname === '/users' && path !== 1) {
      setPath(1);
    }

    if (location.pathname === '/locations' && path !== 2) {
      setPath(2);
    }
  });

  const logOut = () => {
    dispatch(logout());
    history.push('/');
  };

  const a11yProps = (index: number) => {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`
    };
  };

  const handleChange = (event: any, newValue: any) => {
    setPath(newValue);
    if (newValue === 0) {
      history.push('/');
    }

    if (newValue === 1) {
      history.push('/users');
    }

    if (newValue === 2) {
      history.push('/locations');
    }
  };

  return (
    <AppBar position="static">
      {auth.user.token && (
        <Toolbar className={styles.toolbar}>
          <Tabs value={path} onChange={handleChange}>
            <Tab label="Отправления" {...a11yProps(0)} />

            {auth && auth.user.role === 'admin' && (
              <Tab label="Пользователи" {...a11yProps(1)} />
            )}

            {auth && auth.user.role === 'admin' && (
              <Tab label="Локации" {...a11yProps(2)} />
            )}
          </Tabs>

          <div>
            <Typography variant="h6" className={styles.title}>
              {auth.user.username}
            </Typography>
            <ExitToApp id="logout" onClick={logOut} className={styles.icon} />
          </div>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default NavBar;
