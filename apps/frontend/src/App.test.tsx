import { render, screen } from '@testing-library/react';
import App from './App';

test('renders logging application title', () => {
  render(<App />);
  expect(screen.getByText(/task logging app/i)).toBeInTheDocument();
});
