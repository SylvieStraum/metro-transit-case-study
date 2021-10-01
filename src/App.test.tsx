import { render, screen } from '@testing-library/react';
import App from './App';

test('renders primary select', () => {
  render(<App />);
  const selectElement = screen.getByText(/Select route/i);
  expect(selectElement).toBeInTheDocument();
});
