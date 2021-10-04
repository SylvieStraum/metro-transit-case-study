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
  //welcome to my app
  //I have simple routing between two pages
  //one for searching
  //and one for content display
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
