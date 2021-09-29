import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { NextTrip } from './pages/NextTrip';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/nextTrip">
          <NextTrip />
        </Route>
        <Route path="*">
          <Redirect to="/nextTrip"/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
