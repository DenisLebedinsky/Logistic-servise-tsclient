// import { useDispatch } from 'react-redux';
import useReactRouter from "use-react-router";
// import { getUser } from '../../redux/reducers/auth/selectors';
// import {} from "../../redux/reducers/auth/actions";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import React, { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const [path, setPath] = useState(0);
  const { history, location } = useReactRouter();
  // const dispatch = useDispatch();

  // getUser();

  useEffect(() => {
    if (location.pathname === "/" && path !== 0) {
      setPath(0);
    }

    if (location.pathname === "/locations" && path !== 1) {
      setPath(1);
    }

    if (location.pathname === "/users" && path !== 2) {
      setPath(2);
    }
  });

  const a11yProps = (index: number) => {
    return {
      id: `action-tab-${index}`,
      "aria-controls": `action-tabpanel-${index}`
    };
  };

  const handleChange = (event: any, newValue: any) => {
    setPath(newValue);
    if (newValue === 0) {
      history.push("/");
    }

    if (newValue === 1) {
      history.push("/locations");
    }

    if (newValue === 2) {
      history.push("/users");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs value={path} onChange={handleChange}>
          <Tab label="Отправления" {...a11yProps(0)} />

          <Tab label="Пользователи" {...a11yProps(1)} />

          <Tab label="Локации" {...a11yProps(2)} />
        </Tabs>

        {/* <Typography variant="h6" className={classes.title}>
          {user.username}
        </Typography>
        <ExitToApp id="logout" onClick={signOut} /> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
