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

export const fetchRouteTimeDepartures = async (route: string, direction: string, stop: string) => {
    const departuresResponse: AxiosResponse<TimePointDepartureProps[]> = await axios.get(`https://svc.metrotransit.org/nextrip/${route}/${direction}/${stop}`)
    const stopIdResponse: AxiosResponse<StopDetailProps> = await axios.get(`https://svc.metrotransit.org/nextrip/stopid/${route}/${direction}/${stop}`)
    return {
      stopDetailData: stopIdResponse,
      departuresData: departuresResponse,
    }
}