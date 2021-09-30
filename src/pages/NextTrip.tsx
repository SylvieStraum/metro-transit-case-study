import React, { useCallback, useEffect, useState } from 'react';
//import styled from 'styled-components';
import Select from 'react-select'
import axios from 'axios';
import { OptionProps, RouteProps, DirectionAndStopProps, TimePointDepartureProps, StopDetailProps } from '../types/transitApitTypes';
import { DataTable } from '../components/DataTable';

export const NextTrip = () => {
  const [allRoutes, setAllRoutes] = useState<OptionProps[]>([])
  const [directions, setDirections] = useState<OptionProps[]>([])
  const [routeStops, setRouteStops] = useState<OptionProps[]>([])
  const [routeDepartures, SetRouteDepartures] = useState<TimePointDepartureProps[]>([])
  const [selectedRoute, setSelectedRoute] = useState<RouteProps>({ Description: '', ProviderID: 0, Route: 0 })
  const [selectedDirection, setSelectedDirection] = useState<DirectionAndStopProps>({ Text: '', Value: '' })
  const [selectedStop, setSelectedStop] = useState<DirectionAndStopProps>({ Text: '', Value: '' })
  const [stopDetailInfo, setStopDetailInfo] = useState<StopDetailProps>({})

  useEffect(() => {
    fetchRoutes()
  }, [])

  const cascadeFilterReset = (num: number) => {
    switch (num) {
      case 1:
        setDirections([])
        setRouteStops([])
        SetRouteDepartures([])
        setSelectedDirection({ Text: '', Value: '' })
        setSelectedStop({ Text: '', Value: '' })
        break;
      case 2:
        setRouteStops([])
        SetRouteDepartures([])
        setSelectedStop({ Text: '', Value: '' })
        break;
      default:
        break;
    }
  }

  const fetchRoutes = async () => {
    const response = await axios.get('https://svc.metrotransit.org/nextrip/routes')
    setAllRoutes(response.data.map((item: RouteProps) => {
      return { value: item, label: item.Description }
    }))
  }

  const fetchRouteDirections = async (route: number) => {
    const response = await axios.get(`https://svc.metrotransit.org/nextrip/Directions/${route}`)
    setDirections(response.data.map((item: DirectionAndStopProps) => {
      return { value: item, label: item.Text }
    }))
  }

  const fetchRouteStops = async (route: number, direction: string) => {
    const response = await axios.get(`https://svc.metrotransit.org/nextrip/Stops/${route}/${direction}`)
    setRouteStops(response.data.map((item: DirectionAndStopProps) => {
      return { value: item, label: item.Text }
    }))
  }

  const fetchRouteTimeDepartures = async (route: number, direction: string, stop: string) => {
    const departuresResponse = await axios.get(`https://svc.metrotransit.org/nextrip/${route}/${direction}/${stop}`)
    const stopIdResponse = await axios.get(`https://svc.metrotransit.org/nextrip/stopid/${route}/${direction}/${stop}`)
    SetRouteDepartures(departuresResponse.data)
    setStopDetailInfo (stopIdResponse.data)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100vh', overflowY: 'auto', flexDirection: 'column' }}>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center' }}>Real Time Departures</h1>
        <Select options={allRoutes} onChange={(item) => {
          cascadeFilterReset(1)
          setSelectedRoute(item?.value)
          fetchRouteDirections(item?.value.Route)
        }} />
        {
          !!directions.length && <Select options={directions} onChange={(item) => {
            cascadeFilterReset(2)
            setSelectedDirection(item?.value)
            fetchRouteStops(selectedRoute?.Route, item?.value.Value)
          }} />
        }
        {
          !!routeStops.length && <Select options={routeStops} onChange={(item) => {
            setSelectedStop(item?.value)
            fetchRouteTimeDepartures(selectedRoute.Route, selectedDirection.Value, item?.value.Value)
          }} />
        }
      </div>
      {
        !!selectedStop.Value && <DataTable data={routeDepartures} stopInfo={stopDetailInfo}/>
      }


    </div>
  )
}