import { render, screen, waitFor } from '@testing-library/react';
import DataWidget from '../components/DataWidget';

describe('DataWidget', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    jest.resetAllMocks();
    global.fetch = originalFetch;
  });

  test('shows loading then renders data on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: 'ok', service: 'test' })
    });

    render(<DataWidget url="/api/status" />);

    // Initial loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for success
    await waitFor(() => {
      expect(screen.getByLabelText(/data-widget/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/"status": "ok"/i)).toBeInTheDocument();
    expect(screen.getByText(/"service": "test"/i)).toBeInTheDocument();
  });

  test('shows error message on non-200 response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'Internal error'
    });

    render(<DataWidget url="/api/status" />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/internal error/i)).toBeInTheDocument();
  });

  test('shows error on network failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network down'));

    render(<DataWidget url="/api/status" />);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(screen.getByText(/network down/i)).toBeInTheDocument();
  });
});
