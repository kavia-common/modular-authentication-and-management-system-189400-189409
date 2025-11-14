import { render, screen } from '@testing-library/react';
import { RoutesPlaceholder } from '../routes/RoutesPlaceholder';

describe('Routing placeholder', () => {
  test('renders Home route', () => {
    render(<RoutesPlaceholder route="home" />);
    expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome home/i)).toBeInTheDocument();
  });

  test('renders Login route', () => {
    render(<RoutesPlaceholder route="login" />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/please sign in/i)).toBeInTheDocument();
  });

  test('renders Dashboard route', () => {
    render(<RoutesPlaceholder route="dashboard" />);
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByText(/welcome to your dashboard/i)).toBeInTheDocument();
  });
});
