import React, { useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NotificationsCenter renders a simple notification inbox with filters.
 *
 * Props:
 * - items?: Array<{ id: string|number, title: string, summary: string, read?: boolean, time?: string }>
 */
function NotificationsCenter({ items }) {
  const [filter, setFilter] = useState('all');

  const defaultItems = [
    { id: 1, title: 'Welcome', summary: 'Thanks for joining!', read: true, time: '1d' },
    { id: 2, title: 'System update', summary: 'Maintenance at 02:00 UTC', read: false, time: '2h' },
    { id: 3, title: 'New feature', summary: 'Search overlay shipped', read: false, time: 'now' },
  ];

  const data = items && items.length ? items : defaultItems;

  const filtered = useMemo(() => {
    if (filter === 'unread') return data.filter(d => !d.read);
    return data;
  }, [filter, data]);

  return (
    <section aria-labelledby="notifications-title">
      <h1 id="notifications-title" tabIndex={-1}>Notifications Center</h1>
      <div className="toolbar">
        <div role="group" aria-label="Filters" className="btn-group">
          <button className={`btn ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`btn ${filter==='unread'?'active':''}`} onClick={() => setFilter('unread')}>Unread</button>
        </div>
        <button className="btn ghost" onClick={() => {/* no-op */}} aria-label="Clear all notifications">Clear all</button>
      </div>

      {filtered.length === 0 ? (
        <p aria-live="polite">You’re all caught up!</p>
      ) : (
        <ul className="list notifications" role="list">
          {filtered.map((n) => (
            <li key={n.id} className={`notification ${n.read ? 'read' : 'unread'}`}>
              <div className="notification-main">
                <strong className="title">{n.title}</strong>
                <span className="summary">{n.summary}</span>
              </div>
              <div className="notification-meta">
                <span className="time" aria-label={`time ${n.time}`}>{n.time}</span>
                <button className="btn small" aria-pressed={n.read}>{n.read ? 'Restore' : 'Mark read'}</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default NotificationsCenter;
