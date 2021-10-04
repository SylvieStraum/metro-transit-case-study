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
        <Route path="/nexttrip">
          <NextTrip />
        </Route>
        <Route path="/busdepartures">
          <DeparturesPage />
        </Route>
        <Route path="*">
          <Redirect to="/nexttrip"/>
        </Route>
      </Switch>
      </DeparturesContextProvider>
    </Router>
  );
}

export default App;
