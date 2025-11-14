import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchOverlay shows a global search box and simple mocked results.
 *
 * Props:
 * - onClose: () => void
 * - onNavigate?: (route: string) => void
 */
function SearchOverlay({ onClose, onNavigate }) {
  const inputRef = useRef(null);
  const overlayRef = useRef(null);
  const [q, setQ] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        e.preventDefault();
        const size = results.length;
        if (e.key === 'ArrowDown') setActiveIndex((i) => Math.min(size - 1, i + 1));
        if (e.key === 'ArrowUp') setActiveIndex((i) => Math.max(0, i - 1));
        if (e.key === 'Enter' && results[activeIndex]) {
          onNavigate?.(results[activeIndex].route);
          onClose?.();
        }
      }
    };
    overlayRef.current?.addEventListener('keydown', handleKeyDown);
    return () => overlayRef.current?.removeEventListener('keydown', handleKeyDown);
  });

  const all = useMemo(
    () => [
      { group: 'Entities', label: 'Customer: Jane Doe', route: 'entity-form' },
      { group: 'Entities', label: 'Order: 12345', route: 'entity-form' },
      { group: 'Admin', label: 'Role: Editor', route: 'admin' },
      { group: 'Dashboard', label: 'Go to Dashboard', route: 'dashboard' },
    ],
    []
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return all;
    return all.filter((r) => r.label.toLowerCase().includes(term) || r.group.toLowerCase().includes(term));
  }, [q, all]);

  return (
    <div className="overlay-backdrop" role="presentation">
      <div className="overlay" ref={overlayRef} role="dialog" aria-modal="true" aria-labelledby="search-title">
        <h2 id="search-title" className="sr-only">Global Search</h2>
        <div className="search-box">
          <span aria-hidden="true">🔎</span>
          <input
            ref={inputRef}
            placeholder="Search all…"
            aria-label="Search all"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn ghost" onClick={onClose} aria-label="Close search">Esc</button>
        </div>
        <div className="results" role="listbox" aria-label="Results">
          {results.map((r, idx) => (
            <div
              key={`${r.group}-${r.label}`}
              role="option"
              aria-selected={activeIndex === idx}
              className={`result ${activeIndex === idx ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => {
                onNavigate?.(r.route);
                onClose?.();
              }}
              tabIndex={0}
            >
              <span className="group">{r.group}</span>
              <span className="label">{r.label}</span>
            </div>
          ))}
          {results.length === 0 && <div className="empty">No results</div>}
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;
