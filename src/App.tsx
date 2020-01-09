import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './containers/NavBar';
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
