import axios, { AxiosResponse } from "axios"
import { DirectionAndStopProps, StopDetailProps, TimePointDepartureProps, RouteProps } from "../types/transitApiDataTypes"

export const fetchRoutes = async () => {
  try {
    const response: AxiosResponse<RouteProps[]> = await axios.get('https://svc.metrotransit.org/nextrip/routes')
    return {
      ...response,
      success:true
    }
  } catch (e) {
    console.warn('error recieving all routes', e)
  }
}

export const fetchRouteDirections = async (route: string) => {
  try {
    const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Directions/${route}`)
    return {
      ...response,
      success:true
    }
  } catch (e) {
    console.warn('error recieving route directions', e)
  }
}

export const fetchRouteStops = async (route: string, direction: string) => {
  try {
    const response: AxiosResponse<DirectionAndStopProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/Stops/${route}/${direction}`)
    return {
      ...response,
      success:true
    }
  } catch (e) {
    console.warn('error recieving route stops', e)
  }
}

export const fetchRouteTimeDepartures = async (route: string, direction: string, stop: string) => {
  try {
    const departuresResponse: AxiosResponse<TimePointDepartureProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/${route}/${direction}/${stop}`)
    const stopIdResponse: AxiosResponse<StopDetailProps> = await axios.get(`https://svc.metrotransit.org/nextrip/stopid/${route}/${direction}/${stop}`)
    return {
      stopDetailData: stopIdResponse,
      departuresData: departuresResponse,
      success: true
    }
  } catch (e) {
    console.warn('error recieving departures and stop info', e)
  }
}