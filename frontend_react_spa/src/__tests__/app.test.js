import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App root', () => {
  it('renders learn react link text and theme button', () => {
    render(<App />);
    expect(screen.getByText(/learn react/i)).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggle).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
  });
});
