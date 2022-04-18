import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('Webpage contains Sign Up component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create an account/i);
  expect(linkElement).toBeInTheDocument();
});
