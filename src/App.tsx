import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./containers/NavBar";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/locations"></Route>
        <Route path="/users"></Route>
      </Switch>
    </Router>
  );
};

export default App;
