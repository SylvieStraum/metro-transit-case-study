import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { DataTable } from '../components/DataTable';
import { DeparturesContext } from '../context/DeparturesProvider';


export const DeparturesPage = () => {
  const context = useContext(DeparturesContext)
  const history = useHistory()

  const departures = context.routeDepartures
  const stopInfo = context.stopDetailInfo

  return (
    <div className="main-content">
      <CSSTransition
        in={!!stopInfo.StopID}
        timeout={{ enter: 300, exit: 0 }}
        classNames="container"
        unmountOnExit
        mountOnEnter
      >
        <DataTable data={departures} stopInfo={stopInfo} />
      </CSSTransition>
      <button className="metro-button" style={{ width: '30%' }} onClick={() => history.push('/')} >Find another route</button>
    </div>

  )
}