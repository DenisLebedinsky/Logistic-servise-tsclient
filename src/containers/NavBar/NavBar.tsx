import React, { useState, FunctionComponent as FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';

type NavBarProps = {
  history: any;
};

const NavBar: FC<NavBarProps> = ({ history }) => {
  const [value, setValue] = useState(0);

  const a11yProps = (index: number) => {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`
    };
  };

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    if (newValue === 0) {
      history.push('/');
    }

    if (newValue === 1) {
      history.push('/locations');
    }

    if (newValue === 2) {
      history.push('/users');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Отправления" {...a11yProps(0)} />

          <Tab label="Пользователи" {...a11yProps(1)} />

          <Tab label="Локации" {...a11yProps(2)} />
        </Tabs>

        {/* <Typography variant="h6" className={classes.title}>
          {isAuth.user.username}
        </Typography>
        <ExitToApp id="logout" onClick={signOut} /> */}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(NavBar);
