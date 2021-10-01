import axios, { AxiosResponse } from "axios"
import { DirectionAndStopProps, StopDetailProps, TimePointDepartureProps, RouteProps } from "../types/transitApitTypes"

export const fetchRoutes = async () => {
  const response: AxiosResponse<RouteProps[]> = await axios.get('https://svc.metrotransit.org/nextrip/routes')
  return response.data
}

export const fetchRouteDirections = async (route: string) => {
  const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Directions/${route}`)
  return response.data
}

export const fetchRouteStops = async (route: string, direction: string) => {
  const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Stops/${route}/${direction}`)
  return response.data
}

export const fetchRouteTimeDepartures = async (route: string, direction: string, stop: string) => {
  const departuresResponse: AxiosResponse<TimePointDepartureProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/${route}/${direction}/${stop}`)
  const stopIdResponse: AxiosResponse<StopDetailProps> = await axios.get(`https://svc.metrotransit.org/nextrip/stopid/${route}/${direction}/${stop}`)
  return{
    stopData:stopIdResponse.data,
    departuresData:departuresResponse.data
  }
}