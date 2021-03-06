import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import NavBar from './containers/NavBar';
import Authentication from './containers/Authentication';
import Packages from './containers/Packages';
import Locations from './containers/Locations';
import Users from './containers/Users';

import './App.scss';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Packages />
        </Route>
        <Route path="/login">
          <Authentication />
        </Route>
        <Route path="/locations">
          <Locations />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
