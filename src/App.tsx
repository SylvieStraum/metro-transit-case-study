import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { NextTrip } from './pages/NextTrip';
import { DeparturesContextProvider } from './context/DeparturesProvider';
import { DeparturesTable } from './pages/DeparturesTable';

function App() {
  return (
    <Router>
      <DeparturesContextProvider>
      <Switch>
        <Route path="/nextTrip">
          <NextTrip />
        </Route>
        <Route path="/BusTable">
          <DeparturesTable />
        </Route>
        <Route path="*">
          <Redirect to="/nextTrip"/>
        </Route>
      </Switch>
      </DeparturesContextProvider>
    </Router>
  );
}

export default App;
