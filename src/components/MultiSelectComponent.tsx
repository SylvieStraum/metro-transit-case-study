import { CSSTransition } from "react-transition-group"
import { DirectionAndStopProps, RouteProps } from "../types/transitApiDataTypes"
import { MetroSelect } from "./forms/MetroSelect"

interface MultiSelectProps{
  route:string
  direction:string
  stop:string
  allRoutes:RouteProps[]
  directionData:DirectionAndStopProps[]
  stopData:DirectionAndStopProps[]
  handleSelect:(event:any, key:number)=>void
}

export const MultiSelectComponent = ({
  route,
  direction,
  stop,
  allRoutes,
  directionData,
  stopData,
  handleSelect
}:MultiSelectProps) => {
//component to house selects and their states to clean up the NextTrip page
  return (
    <>
      <MetroSelect
        className="slide-down-enter-done"
        value={route}
        onChange={(event) => handleSelect(event, 1)}
        defaultText="Select route"
        data={allRoutes}
      />
      <CSSTransition
        in={!!route}
        timeout={{ enter: 300, exit: 0 }}
        classNames="slide-down"
        unmountOnExit
        mountOnEnter
      ><MetroSelect
          value={direction}
          onChange={(event) => handleSelect(event, 2)}
          defaultText="Select direction"
          data={directionData}
        />
      </CSSTransition>
      <CSSTransition
        in={!!direction}
        timeout={{ enter: 300, exit: 0 }}
        classNames="slide-down"
        unmountOnExit
        mountOnEnter
      >
        <MetroSelect
          value={stop}
          onChange={(event) => handleSelect(event, 3)}
          defaultText="Select stop"
          data={stopData}
        />
      </CSSTransition>
    </>
  )
}