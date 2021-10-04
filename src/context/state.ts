import { useReducer } from 'react'
import { RouteProps, StopDetailProps, TimePointDepartureProps } from '../types/transitApiDataTypes'

interface DeparturesProviderState {
  stopDetailInfo: StopDetailProps
  routeDepartures: TimePointDepartureProps[]
  allRoutes: RouteProps[]
  searchError?: {error:Error, stopId:number}
}

const storedStopDetails = localStorage.getItem('stopDetails')
const storedDepartures = localStorage.getItem('departureDetails')
const storesAllRoutes = localStorage.getItem('allRoutes')

type DeparturesProviderAction =
  {
    type: 'SET_STOP_DETAILS',
    payload: { stopDetailInfo: StopDetailProps }
  }
  | {
    type: 'SET_DEPARTURES',
    payload: { routeDepartures: TimePointDepartureProps[] }
  }
  | {
    type: 'SET_BASE_ROUTES',
    payload: { allRoutes: RouteProps[] }
  }
  | {
    type: 'SET_SEARCH_ERROR',
    payload: { searchError?: {error:Error, stopId:number} }
  }

export const useDepartureProviderState = () => {
  //reducer establishes base items with local storage and commits it there to reduce the need to ping API for info 
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
        case 'SET_BASE_ROUTES':
          localStorage.setItem('allRoutes', JSON.stringify(action.payload.allRoutes));
          return {
            ...prevState,
            routeDepartures: action.payload.allRoutes,
          }
          case'SET_SEARCH_ERROR':
            return{
              ...prevState,
              searchError:action.payload.searchError
            }
        default:
          return {
            stopDetailInfo: {},
            routeDepartures: [],
            allRoutes:[],
            searchError:undefined
          }
      }
    },
    {
      stopDetailInfo: storedStopDetails ? JSON.parse(storedStopDetails) : {},
      routeDepartures: storedDepartures ? JSON.parse(storedDepartures) : [],
      allRoutes: storesAllRoutes ? JSON.parse(storesAllRoutes) : [],
      searchError:undefined
      
    }
  )
}
