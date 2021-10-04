import { useEffect, useState } from 'react';
import { DirectionAndStopProps } from '../types/transitApiDataTypes';
import { CSSTransition } from 'react-transition-group';
import { MetroSelect } from '../components/MetroSelect';

import '../App.css'
import { fetchRouteDirections, fetchRouteStops } from '../services';
import { useContext } from 'react';
import { DeparturesContext } from '../context/DeparturesProvider';
import { DataTable } from '../components/DataTable';
import { QuerySelector } from '../components/QuerySelector';
import { MetroSearchBar } from '../components/MetroSearchBar';

export const NextTrip = () => {
  const departureContext = useContext(DeparturesContext)

  const [fetchStatus, setFetchStatus] = useState<boolean>(false)

  const [routeDirections, setRouteDirections] = useState<DirectionAndStopProps[]>([])
  const [routeStops, setRouteStops] = useState<DirectionAndStopProps[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [selectedDirection, setSelectedDirection] = useState<string>('')
  const [selectedStop, setSelectedStop] = useState<string>('')
  const [stopNumber, setStopNumber] = useState<string>('')
  const [queryType, setQueryType] = useState<'select' | 'search'>('select')

  useEffect(() => {
    setFetchStatus(false)
    departureContext.getAllRoutes()
  }, [])

  const getTableData = (val:string) => {
    if (queryType === 'select') {
      departureContext.getDeparturesAndStopDetailsByRoute(selectedRoute, selectedDirection, val)
    } else {
      departureContext.getDeparturesAndStopDetailsByStopId(val)
    }
    setFetchStatus(true)
  }

  const handleSelect = (event: any, key: number) => {
    switch (key) {
      case 1:
        setRouteDirections([])
        setRouteStops([])
        setSelectedDirection('')
        setSelectedStop('')
        setSelectedRoute(event.target.value)
        fetchRouteDirections(event.target.value)
          .then(response => setRouteDirections(response.data))
        break;
      case 2:
        setRouteStops([])
        setSelectedStop('')
        setSelectedDirection(event.target!.value)
        fetchRouteStops(selectedRoute, event.target.value)
          .then(response => setRouteStops(response.data))
        break;
      case 3:
        setSelectedStop(event.target.value)
        getTableData(event.target.value)
        break;
      default:
        break;
    }

  }
  return (
    <div className="main-content">
      <QuerySelector
        setQueryType={setQueryType}
        queryType={queryType} />
      <h1 style={{ textAlign: 'center' }}>Real Time Departures</h1>
      <div className="route-select-container">
        {
          queryType === 'select' ?
            <>
              <MetroSelect
                className="slide-down-enter-done"
                value={selectedRoute}
                onChange={(event) => handleSelect(event, 1)}
                defaultText="Select route"
                data={departureContext.allRoutes}
              />
              <CSSTransition
                in={!!selectedRoute}
                timeout={{ enter: 300, exit: 0 }}
                classNames="slide-down"
                unmountOnExit
                mountOnEnter
              ><MetroSelect
                  value={selectedDirection}
                  onChange={(event) => handleSelect(event, 2)}
                  defaultText="Select direction"
                  data={routeDirections}
                />
              </CSSTransition>
              <CSSTransition
                in={!!selectedDirection}
                timeout={{ enter: 300, exit: 0 }}
                classNames="slide-down"
                unmountOnExit
                mountOnEnter
              >
                <MetroSelect
                  value={selectedStop}
                  onChange={(event) => handleSelect(event, 3)}
                  defaultText="Select stop"
                  data={routeStops}
                />
              </CSSTransition>
            </>
            :
            <MetroSearchBar
              setStopNumber={setStopNumber}
              stopNumber={stopNumber}
              getTableData={getTableData}
            />
        }
      </div>
      <CSSTransition
        in={fetchStatus}
        timeout={{ enter: 300, exit: 0 }}
        classNames="container"
        unmountOnExit
        mountOnEnter
      >
        <DataTable
          data={departureContext.routeDepartures.slice(0, 1)}
          stopInfo={departureContext.stopDetailInfo}
          bottomNav={departureContext.routeDepartures.length > 1 ? `busDepartures` : ''} />
      </CSSTransition>
    </div>
  )
}
