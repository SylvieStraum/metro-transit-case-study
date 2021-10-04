import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { NextTrip } from './pages/NextTrip';
import { DeparturesContextProvider } from './context/DeparturesProvider';
import { DeparturesPage } from './pages/DeparturesPage';
import { HeaderNav } from './components/HeaderNav';

function App() {
  return (
    <Router>
      <DeparturesContextProvider>
        <HeaderNav/>
      <Switch>
        <Route path="/nextTrip">
          <NextTrip />
        </Route>
        <Route path="/BusTable">
          <DeparturesPage />
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
