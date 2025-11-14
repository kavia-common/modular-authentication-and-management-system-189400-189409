import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * AdminTable renders an overview table with simple pagination controls.
 *
 * Props:
 * - rows?: Array<{ entity: string, count: number, status: string }>
 */
function AdminTable({ rows }) {
  const defaultRows = [
    { entity: 'Users', count: 152, status: 'OK' },
    { entity: 'Roles', count: 8, status: 'OK' },
    { entity: 'Audit', count: 3201, status: 'OK' },
    { entity: 'Settings', count: 4, status: 'OK' },
  ];
  const data = rows && rows.length ? rows : defaultRows;

  const pageSize = 3;
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(data.length / pageSize));
  const start = (page - 1) * pageSize;
  const view = data.slice(start, start + pageSize);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(pages, p + 1));

  return (
    <section aria-labelledby="admin-title">
      <h1 id="admin-title" tabIndex={-1}>Admin Dashboard</h1>
      <h2>System Overview</h2>
      <div className="table-wrap">
        <table className="table" role="table">
          <thead>
            <tr>
              <th scope="col">Entity</th>
              <th scope="col">Count</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {view.map((r) => (
              <tr key={r.entity}>
                <th scope="row">{r.entity}</th>
                <td>{r.count}</td>
                <td>{r.status}</td>
                <td><button className="btn small">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="pagination" aria-label="Pagination">
        <button className="btn small" onClick={prev} disabled={page === 1} aria-label="Previous page">◀</button>
        <span aria-live="polite" className="page-indicator">Page {page} of {pages}</span>
        <button className="btn small" onClick={next} disabled={page === pages} aria-label="Next page">▶</button>
      </nav>
    </section>
  );
}

export default AdminTable;
