import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { DeparturesContext } from '../context/DeparturesProvider';


export const DeparturesPage = () => {
  const departureContext = useContext(DeparturesContext)
  const history = useHistory()

  const departures = departureContext.routeDepartures
  const stopInfo = departureContext.stopDetailInfo
  //simple page to render the dataTable and a button to return to the search page
  return (
    <div className="main-content">
      <DataTable data={departures} stopInfo={stopInfo} totalLength={departures.length}/>
      <button className="metro-button" onClick={() => history.push('/')} >Find another route</button>
    </div>

  )
}