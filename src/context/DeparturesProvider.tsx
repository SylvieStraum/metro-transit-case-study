import React from "react";
import { useEffect } from "react";
import { fetchRoutes, fetchRouteTimeDepartures, fetchStopDetails, fetchStopDetailsByStopNumber, fetchTimeDeparturesByStopNumber } from "../services";
import { TimePointDepartureProps, StopDetailProps, RouteProps } from '../types/transitApiDataTypes';
import { useDepartureProviderState } from './state'

interface DeparturesContextValue {
  getDeparturesAndStopDetailsByStopId: (stopId: string) => Promise<void>,
  getDeparturesAndStopDetailsByRoute: (route: string, direction: string, stop: string) => Promise<void>,
  getAllRoutes: () => Promise<void>
  stopDetailInfo: StopDetailProps,
  routeDepartures: TimePointDepartureProps[]
  allRoutes: RouteProps[]
  searchError?: {error:Error, stopId:number}
}

export const DeparturesContext = React.createContext<DeparturesContextValue>({
  stopDetailInfo: {},
  routeDepartures: [],
  allRoutes: [],
  searchError:undefined
} as any);


export const DeparturesContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useDepartureProviderState()

  const getAllRoutes = async () => {
    //fetches all routes if it does not already in reducer
    if (state.allRoutes.length) {
      return
    }

    const response = await fetchRoutes()
    return dispatch({ type: 'SET_BASE_ROUTES', payload: { allRoutes: response.data } })
  }

  const getDeparturesAndStopDetailsByRoute = async (route: string, direction: string, stop: string) => {
      //fetches stop details and departure list if it does not already in reducer by route selections
    const departureResponse = await fetchRouteTimeDepartures(route, direction, stop)
    const stopResponse = await fetchStopDetails(route, direction, stop)
    dispatch({ type: 'SET_STOP_DETAILS', payload: { stopDetailInfo: stopResponse.data } })
    dispatch({ type: 'SET_DEPARTURES', payload: { routeDepartures: departureResponse.data } })
  }

  const getDeparturesAndStopDetailsByStopId = async (stopId: string) => {
    //fetches stop details and departure list if it does not already in reducer by stopId # 
    dispatch({type:'SET_SEARCH_ERROR', payload:{searchError:undefined}})
    try{
    const departureResponse = await fetchTimeDeparturesByStopNumber(parseInt(stopId))
    const stopResponse = await fetchStopDetailsByStopNumber(parseInt(stopId))
    dispatch({ type: 'SET_STOP_DETAILS', payload: { stopDetailInfo: stopResponse.data } })
    dispatch({ type: 'SET_DEPARTURES', payload: { routeDepartures: departureResponse.data } })
    }catch(e:any){
      dispatch({type:'SET_SEARCH_ERROR', payload:{searchError:{error:e,stopId:parseInt(stopId)}}})
    }
  }

  const value: DeparturesContextValue = {
    getAllRoutes,
    getDeparturesAndStopDetailsByRoute,
    getDeparturesAndStopDetailsByStopId,
    allRoutes: state.allRoutes,
    stopDetailInfo: state.stopDetailInfo,
    routeDepartures: state.routeDepartures,
    searchError:state.searchError
  }
  return (
    <DeparturesContext.Provider value={value}>
      {children}
    </DeparturesContext.Provider>
  );
};