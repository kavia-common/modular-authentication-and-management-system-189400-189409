import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * DataWidget fetches data from a URL (or ENV-based default) and shows loading,
 * data, or error states.
 *
 * Props:
 * - url?: string - optional URL to fetch; defaults to `${REACT_APP_API_BASE}/status` or '/api/status'
 *
 * Returns:
 * - A component that renders loading indicator, data JSON, or error message.
 */
function DataWidget({ url }) {
  const apiBase = process.env.REACT_APP_API_BASE || '';
  const endpoint = url || (apiBase ? `${apiBase}/status` : '/api/status');

  const [state, setState] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, data: null, error: null });
    fetch(endpoint)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setState({ loading: false, data: json, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ loading: false, data: null, error: err.message || 'Error' });
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  if (state.loading) return <div aria-busy="true">Loading...</div>;
  if (state.error) return <div role="alert">Error: {state.error}</div>;

  return (
    <div aria-label="data-widget">
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
    </div>
  );
}

export default DataWidget;
