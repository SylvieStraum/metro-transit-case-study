import { useEffect, useState } from 'react';
import { DirectionAndStopProps } from '../types/transitApiDataTypes';
import { CSSTransition } from 'react-transition-group';
import { MetroSelect } from '../components/forms/MetroSelect';

import '../App.css'
import { fetchRouteDirections, fetchRouteStops } from '../services';
import { useContext } from 'react';
import { DeparturesContext } from '../context/DeparturesProvider';
import { DataTable } from '../components/DataTable';
import { QuerySelector } from '../components/QuerySelector';
import { MetroSearchBar } from '../components/forms/MetroSearchBar';
import { MultiSelectComponent } from '../components/MultiSelectComponent';

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
    //state to tell if we should see search results below. default to false as we only want current result on this page
    setFetchStatus(false)
    departureContext.getAllRoutes()
  }, [])

  const getTableData = (finalVal: string) => {
    //use finalVal as sometimes the state doesn't update in time and causes minor error for last value 
    if (queryType === 'select') {
      departureContext.getDeparturesAndStopDetailsByRoute(selectedRoute, selectedDirection, finalVal)
    } else {
      departureContext.getDeparturesAndStopDetailsByStopId(finalVal)
    }
    //after everything is fired allow first result to be displayed below
    setFetchStatus(true)
  }

  const handleSelect = (event: any, key: number) => {
    //a little hacky but just a state reset if you interact with a previous select while others have active info. 
    //this reduces sending out bad requests
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
            <MultiSelectComponent
              route={selectedRoute}
              direction={selectedDirection}
              stop={selectedStop}
              allRoutes={departureContext.allRoutes}
              directionData={routeDirections}
              stopData={routeStops}
              handleSelect={handleSelect}
            />
            :
            <MetroSearchBar
              setStopNumber={setStopNumber}
              stopNumber={stopNumber}
              getTableData={getTableData}
              error={departureContext.searchError}
            />
        }
      </div>
      <CSSTransition
        in={queryType === 'search' ? !!!departureContext.searchError && fetchStatus : fetchStatus}
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
