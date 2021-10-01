import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { RouteProps, DirectionAndStopProps, TimePointDepartureProps, StopDetailProps } from '../types/transitApitTypes';
import { DataTable } from '../components/DataTable';
import { CSSTransition, Transition } from 'react-transition-group';
import arrows from '../assets/arrows.svg'

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
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', overflowY: 'auto', flexDirection: 'column', marginTop:'10%' }}>
      <img alt="metro transit home" src="https://www.metrotransit.org/img/MetroTransitLogo.svg" />
      <div style={{ width: '30%', minWidth:'400px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ textAlign: 'center' }}>Real Time Departures</h2>
        <MetroSelect name="bus routes"
          className="select-enter-done"
          value={selectedRoute}
          onChange={(event) => {
            cascadeFilterReset(1)
            setSelectedRoute(event.target.value)
            fetchRouteDirections(event.target.value)
          }}>
          <MetroOption value={''}>Select route</MetroOption>
          {
            !!allRoutes.length && allRoutes.map((item, i) =>
              <MetroOption key={i} value={item.Route}>{item.Description}</MetroOption>)
          }
        </MetroSelect>
        {
          <CSSTransition
            in={!!selectedRoute}
            timeout={{enter:300, exit:0}}
            classNames="select"
            unmountOnExit
            mountOnEnter
          ><MetroSelect
            name="route directions"
            value={selectedDirection}
            onChange={(event) => {
              cascadeFilterReset(2)
              setSelectedDirection(event.target.value)
              fetchRouteStops(selectedRoute, event.target.value)
            }}
          >
              <MetroOption>Select direction</MetroOption>
              {
                routeDirections.map((item, i) => <MetroOption key={i} value={item.Value}>{item.Text}</MetroOption>)
              }
            </MetroSelect>
          </CSSTransition>
        }
        {
          <CSSTransition
            in={!!selectedDirection}
            timeout={{enter:300, exit:0}}
            classNames="select"
            unmountOnExit
            mountOnEnter
          >
            <MetroSelect
              name="stops for bus route"
              value={selectedStop}
              onChange={(event) => {
                setSelectedStop(event.target.value)
                fetchRouteTimeDepartures(selectedRoute, selectedDirection, event.target.value)
              }}
            >
              <option>Select stop</option>
              {
                routeStops.map((item, i) => <option key={i} value={item.Value}>{item.Text}</option>)
              }
            </MetroSelect>
          </CSSTransition>
        }
      </div>
      {
        <CSSTransition
          in={!!selectedStop}
          timeout={{enter:300, exit:0}}
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

const MetroSelect = styled.select`
  background: url(${arrows})
  no-repeat right .75rem center/8px 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  vertical-align: middle;
  margin-top: 20px;
  width: 100%;
  height: 50px;
  font-size: 1.125rem!important;
  padding: .75em;
  font-weight: 400;
  line-height: 1.5;
  color: #626462;
  transition: background-color .5s ease-in-out,border-color .5s ease-in-out,box-shadow .5s ease-in-out, opacity .5s, transform .5s;
}
`

const MetroOption = styled.option`
font-weight: normal;
display: block;
white-space: nowrap;
min-height: 1.2em;
padding: 0px 2px 1px;
`