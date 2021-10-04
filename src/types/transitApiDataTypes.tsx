export interface RouteProps {
  Description?: string,
  ProviderID?: number,
  Route?: string
}

export interface DirectionAndStopProps {
  Text?: string,
  Value?: string
}

export interface TimePointDepartureProps {
  Actual?: boolean
  BlockNumber?: number
  DepartureText?: string
  DepartureTime?: Date
  Description?: string
  Gate?: string | null
  Route?: string
  RouteDirection?: string
  Terminal?: string
  VehicleHeading?: number
  VehicleLatitude?: number
  VehicleLongitude?: number
}

export interface StopDetailProps {
  Latitude?: number
  Longitude?: number
  StopID?: number
  StopLabel?: string
}