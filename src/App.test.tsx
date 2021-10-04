import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { CSSTransition } from 'react-transition-group';
import { MetroSelect } from './components/forms/MetroSelect';
import App from './App';
import './App.css'
import { fetchRouteDirections, fetchRoutes, fetchRouteStops, fetchRouteTimeDepartures, fetchStopDetails, fetchStopDetailsByStopNumber, fetchTimeDeparturesByStopNumber } from './services';

test('api returns expected data when called', async () => {

  const routesApi= await fetchRoutes()
  const directionApi = await fetchRouteDirections('901')
  const stopsApi = await fetchRouteStops('901', '0')
  const departuresApi = await fetchRouteTimeDepartures('901', '0', 'MAAM')
  const stopDetalApi = await fetchStopDetails('901', '0', 'MAAM')
  const departuresByStopNumberApi = await fetchTimeDeparturesByStopNumber(51405)
  const stopDetalByStopNumberApi = await fetchStopDetailsByStopNumber(51405)
  
  
  expect(routesApi?.data[0].Description === 'METRO Blue Line').toBe(true);
  expect(directionApi?.data[0].Text === 'Northbound').toBe(true);
  expect(stopsApi?.data[0].Text === 'Mall of America Station').toBe(true);
  expect(departuresApi?.data[0].Description === 'to Mpls-Target Field').toBe(true);
  expect(stopDetalApi?.data.StopLabel === 'MOA Transit Station').toBe(true);
  expect(departuresByStopNumberApi?.data[0].Description === 'to Mpls-Target Field').toBe(true);
  expect(stopDetalByStopNumberApi?.data.StopLabel === 'MOA Transit Station').toBe(true);
});

test('renders primary select', () => {
  render(<App />);
  const selectElement = screen.getByText(/Select route/i);
  expect(selectElement).toBeInTheDocument();
});

test('if custom select handles events properly', async () => {
  const handleClick = jest.fn()
  act(() => {
    render(<MetroSelect className="slide-down-enter-done"
      value={''}
      onChange={handleClick}
      defaultText='click me'
      data={[]} />)
    fireEvent.change(screen.getByDisplayValue(/click me/i), { target: { value: '' } })
  })
  expect(handleClick).toHaveBeenCalledTimes(1)
});

test('css transition mounts component when "in" is truthy', () => {
  //using select with similar display name to act as fodder. 
  //without an onchange event it doesn't increase the count needed to signify the select being mounted 
  const handleClick = jest.fn()
  act(() => {
    render(<div>
      <CSSTransition
        in={false}
        timeout={{ enter: 300, exit: 0 }}
        classNames="slide-down"
        unmountOnExit
        mountOnEnter>
        <MetroSelect className="slide-down-enter-done"
          value={'invisible => visible '}
          onChange={handleClick}
          defaultText='click me'
          data={[]} />
      </CSSTransition>
      <select><option>click me</option></select>
    </div>)

    fireEvent.change(screen.getAllByDisplayValue(/click me/i)[0], { target: { value: '' } })
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  act(() => {
    render(<div>
      <CSSTransition
        in={true}
        timeout={{ enter: 300, exit: 0 }}
        classNames="slide-down"
        unmountOnExit
        mountOnEnter>
        <MetroSelect className="slide-down-enter-done"
          value={'invisible => visible '}
          onChange={handleClick}
          defaultText='click me'
          data={[]} />
      </CSSTransition>
      <select><option>click me</option></select>
    </div>)

    fireEvent.change(screen.getAllByDisplayValue(/click me/i)[0], { target: { value: 'true' } })
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
});