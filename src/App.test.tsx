import { render, screen } from '@testing-library/react';
import App from './App';
import { fetchRoutes } from './services';
import {RouteProps} from './types/transitApiDataTypes'

test('renders primary select', () => {
  render(<App />);
  const selectElement = screen.getByText(/Select route/i);
  expect(selectElement).toBeInTheDocument();
});

test('tests api Endpoints to recieve proper datatype', async() => {
  render(<App />);
  const selectElement = screen.getByText(/Select directions/i);
  expect(selectElement).not.toBeInTheDocument();
});