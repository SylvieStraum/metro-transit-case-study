import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RouteProps, DirectionAndStopProps, TimePointDepartureProps, StopDetailProps } from '../types/transitApitTypes';
import { DataTable } from '../components/DataTable';
import { CSSTransition } from 'react-transition-group';
import { MetroSelect } from '../components/MetroSelect';

import '../App.css'
import { fetchRouteDirections, fetchRoutes, fetchRouteStops, fetchRouteTimeDepartures } from '../services';

export const NextTrip = () => {
  const [allRoutes, setAllRoutes] = useState<RouteProps[]>([])
  const [routeDirections, setRouteDirections] = useState<DirectionAndStopProps[]>([])
  const [routeStops, setRouteStops] = useState<DirectionAndStopProps[]>([])
  const [routeDepartures, setRouteDepartures] = useState<TimePointDepartureProps[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [selectedDirection, setSelectedDirection] = useState<string>('')
  const [selectedStop, setSelectedStop] = useState<string>('')
  const [stopDetailInfo, setStopDetailInfo] = useState<StopDetailProps>({})

  useEffect(() => {
    fetchRoutes().then(response=> setAllRoutes(response))
  }, [])

  const cascadeFilterReset = (num: number) => {
    switch (num) {
      case 1:
        setRouteDirections([])
        setRouteStops([])
        setRouteDepartures([])
        setSelectedDirection('')
        setSelectedStop('')
        setStopDetailInfo({})
        break;
      case 2:
        setRouteStops([])
        setRouteDepartures([])
        setSelectedStop('')
        setStopDetailInfo({})
        break;
      default:
        break;
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', overflowY: 'auto', flexDirection: 'column', marginTop: '10%' }}>
      <img alt="metro transit home" src="https://www.metrotransit.org/img/MetroTransitLogo.svg" />
      <div style={{ width: '30%', minWidth: '400px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ textAlign: 'center' }}>Real Time Departures</h2>
        <MetroSelect
          className="select-enter-done"
          value={selectedRoute}
          onChange={(event) => {
            cascadeFilterReset(1)
            setSelectedRoute(event.target.value)
            fetchRouteDirections(event.target.value)
            .then(response=>setRouteDirections(response))
          }}
          defaultText="Select route"
          data={allRoutes}
        />
        {
          <CSSTransition
            in={!!selectedRoute}
            timeout={{ enter: 300, exit: 0 }}
            classNames="select"
            unmountOnExit
            mountOnEnter
          ><MetroSelect
              value={selectedDirection}
              className="select"
              onChange={(event) => {
                cascadeFilterReset(2)
                setSelectedDirection(event.target!.value)
                fetchRouteStops(selectedRoute, event.target.value)
                .then(response=> setRouteStops(response))
              }}
              defaultText="Select direction"
              data={routeDirections}
            />
          </CSSTransition>
        }
        {
          <CSSTransition
            in={!!selectedDirection}
            timeout={{ enter: 300, exit: 0 }}
            classNames="select"
            unmountOnExit
            mountOnEnter
          >
            <MetroSelect
              className="select"
              value={selectedStop}
              onChange={(event) => {
                setSelectedStop(event.target.value)
                fetchRouteTimeDepartures(selectedRoute, selectedDirection, event.target.value)
                .then(response=>{ 
                  setRouteDepartures(response.departuresData)
                  setStopDetailInfo(response.stopData)
                })
              }}
              defaultText="Select stop"
              data={routeStops}
            />
          </CSSTransition>
        }
      </div>
      {
        <CSSTransition
          in={!!selectedStop}
          timeout={{ enter: 300, exit: 0 }}
          classNames="container"
          unmountOnExit
          mountOnEnter
        >
          <DataTable data={routeDepartures} stopInfo={stopDetailInfo} />
        </CSSTransition>
      }
    </div>
  )
}
