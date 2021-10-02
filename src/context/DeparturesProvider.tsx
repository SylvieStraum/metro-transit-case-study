import React from "react";
import { TimePointDepartureProps, StopDetailProps } from '../types/transitApiDataTypes';
import { useDepartureProviderState } from './state'

interface DeparturesContextValue {
  setStopDetailInfo: (item: StopDetailProps) => void,
  setRouteDepartures: (item: TimePointDepartureProps[]) => void,
  stopDetailInfo: StopDetailProps,
  routeDepartures: TimePointDepartureProps[]
}

export const DeparturesContext = React.createContext<DeparturesContextValue>({
  stopDetailInfo: {},
  routeDepartures: [],
} as any);

export const DeparturesContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useDepartureProviderState()


  const setStopDetailInfo = (item: StopDetailProps) => {
    dispatch({ type: 'SET_STOP_DETAILS', payload: { stopDetailInfo: item } })
  }

  const setRouteDepartures = (item: TimePointDepartureProps[]) => {
    dispatch({ type: 'SET_DEPARTURES', payload: { routeDepartures: item } })
  }

  const value: DeparturesContextValue = {
    setRouteDepartures,
    setStopDetailInfo,
    stopDetailInfo:state.stopDetailInfo,
    routeDepartures:state.routeDepartures
  }
  return (
    <DeparturesContext.Provider value={value}>
      {children}
    </DeparturesContext.Provider>
  );
};