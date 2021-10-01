import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { RouteProps, DirectionAndStopProps, TimePointDepartureProps, StopDetailProps } from '../types/transitApitTypes';
import { DataTable } from '../components/DataTable';
import { CSSTransition } from 'react-transition-group';
import { MetroSelect } from '../components/MetroSelect';

import '../App.css'

export const NextTrip = () => {
  const [allRoutes, setAllRoutes] = useState<RouteProps[]>([])
  const [routeDirections, setRouteDirections] = useState<DirectionAndStopProps[]>([])
  const [routeStops, setRouteStops] = useState<DirectionAndStopProps[]>([])
  const [routeDepartures, SetRouteDepartures] = useState<TimePointDepartureProps[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const [selectedDirection, setSelectedDirection] = useState<string>('')
  const [selectedStop, setSelectedStop] = useState<string>('')
  const [stopDetailInfo, setStopDetailInfo] = useState<StopDetailProps>({})

  useEffect(() => {
    fetchRoutes()
  }, [])

  const cascadeFilterReset = (num: number) => {
    switch (num) {
      case 1:
        setRouteDirections([])
        setRouteStops([])
        SetRouteDepartures([])
        setSelectedDirection('')
        setSelectedStop('')
        setStopDetailInfo({})
        break;
      case 2:
        setRouteStops([])
        SetRouteDepartures([])
        setSelectedStop('')
        setStopDetailInfo({})
        break;
      default:
        break;
    }
  }

  const fetchRoutes = async () => {
    const response: AxiosResponse<RouteProps[]> = await axios.get('https://svc.metrotransit.org/nextrip/routes')
    setAllRoutes(response.data)
  }

  const fetchRouteDirections = async (route: string) => {
    const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Directions/${route}`)
    setRouteDirections(response.data)
  }

  const fetchRouteStops = async (route: string, direction: string) => {
    const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Stops/${route}/${direction}`)
    setRouteStops(response.data)
  }

  const fetchRouteTimeDepartures = async (route: string, direction: string, stop: string) => {
    const departuresResponse: AxiosResponse<TimePointDepartureProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/${route}/${direction}/${stop}`)
    const stopIdResponse: AxiosResponse<StopDetailProps> = await axios.get(`https://svc.metrotransit.org/nextrip/stopid/${route}/${direction}/${stop}`)
    SetRouteDepartures(departuresResponse.data)
    setStopDetailInfo(stopIdResponse.data)
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
