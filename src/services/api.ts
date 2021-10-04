import axios, { AxiosResponse } from "axios"
import { DirectionAndStopProps, StopDetailProps, TimePointDepartureProps, RouteProps } from "../types/transitApiDataTypes"

export const fetchRoutes = async () => {
  const response: AxiosResponse<RouteProps[]> = await axios.get('https://svc.metrotransit.org/nextrip/routes')
  return response
}

export const fetchRouteDirections = async (route: string) => {
  const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Directions/${route}`)
  return response
}

export const fetchRouteStops = async (route: string, direction: string) => {
  const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Stops/${route}/${direction}`)
  return response
}

export const fetchRouteTimeDepartures = async (route?: string, direction?: string, stop?: string) => {
  const response: AxiosResponse<TimePointDepartureProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/${route}/${direction}/${stop}`)
  return response
}

export const fetchStopDetails = async (route: string, direction: string, stop: string) => {
  const response: AxiosResponse<StopDetailProps> = await axios.get(`https://svc.metrotransit.org/nextrip/stopid/${route}/${direction}/${stop}`)
  return response
}

export const fetchStopDetailsByStopNumber = async (stopId: number) => {
  const response: AxiosResponse<StopDetailProps> = await axios.get(`https://svc.metrotransit.org/nextrip/stopid/${stopId}`)
  return response
}

export const fetchTimeDeparturesByStopNumber = async (stopId: number) => {
  const response: AxiosResponse<TimePointDepartureProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/${stopId}`)
  return response
}