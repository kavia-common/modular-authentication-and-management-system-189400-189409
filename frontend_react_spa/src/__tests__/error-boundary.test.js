import { render, screen } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../src/components/ErrorBoundary';

function Boom() {
  throw new Error('Boom!');
}

describe('ErrorBoundary', () => {
  test('renders fallback UI when child throws', () => {
    const fallback = <div role="alert">Custom fallback</div>;
    // Silence expected error logs from React error boundary during test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary fallback={fallback}>
        <Boom />
      </ErrorBoundary>
    );

    expect(screen.getByRole('alert')).toHaveTextContent(/custom fallback/i);
    spy.mockRestore();
  });
});
