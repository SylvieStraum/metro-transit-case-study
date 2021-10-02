import { useReducer } from 'react'
import { StopDetailProps, TimePointDepartureProps } from '../types/transitApiDataTypes'

interface DeparturesProviderState {
  stopDetailInfo: StopDetailProps
  routeDepartures: TimePointDepartureProps[]
}

const storedStopDetails = localStorage.getItem('stopDetails')
const storedDepartures = localStorage.getItem('departureDetails')

type DeparturesProviderAction = {
  type: 'SET_STOP_DETAILS',
  payload: { stopDetailInfo: StopDetailProps }
}
  | {
    type: 'SET_DEPARTURES',
    payload: { routeDepartures: TimePointDepartureProps[] }
  }

export const useDepartureProviderState = () => {
  return useReducer(
    (prevState: DeparturesProviderState, action: DeparturesProviderAction): DeparturesProviderState => {
      switch (action.type) {
        case 'SET_STOP_DETAILS':
          localStorage.setItem('stopDetails', JSON.stringify(action.payload.stopDetailInfo));
          return {
            ...prevState,
            stopDetailInfo: action.payload.stopDetailInfo,

          }
        case 'SET_DEPARTURES':
          localStorage.setItem('departureDetails', JSON.stringify(action.payload.routeDepartures));
          return {
            ...prevState,
            routeDepartures: action.payload.routeDepartures,
          }
        default:
          return {
            stopDetailInfo: {},
            routeDepartures: [],
          }
      }
    },
    {
      stopDetailInfo: storedStopDetails ? JSON.parse(storedStopDetails) : {},
      routeDepartures: storedDepartures ? JSON.parse(storedDepartures) : [],
    }
  )
}
