import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/dashboard"

export default () => (
  <Router>
      <Switch>
        <Route exact path="/" render={() => (
          <Redirect to="/dashboard"/>
        )}/>
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
  </Router>
);