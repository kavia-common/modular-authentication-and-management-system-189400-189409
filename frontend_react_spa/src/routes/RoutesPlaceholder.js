import React, { useEffect } from 'react';
import DataWidget from '../components/DataWidget';
import LoginModal from '../components/LoginModal';
import NotificationsCenter from '../components/NotificationsCenter';
import AdminTable from '../components/AdminTable';
import EntityForm from '../components/EntityForm';
import SearchOverlay from '../components/SearchOverlay';

/**
 * PUBLIC_INTERFACE
 * RoutesPlaceholder simulates simple "routing" by rendering a view
 * based on a `route` prop. This avoids introducing react-router for now.
 * 
 * Props:
 * - route: 'home' | 'login' | 'dashboard' | 'notifications' | 'admin' | 'entity-form' | 'search'
 * - onCloseLogin?: () => void
 * - onOpenSearch?: () => void
 * - onCloseSearch?: () => void
 */
export function RoutesPlaceholder({ route = 'home', onCloseLogin, onOpenSearch, onCloseSearch }) {
  // Focus main heading for accessibility on route changes (except for modal-only routes)
  useEffect(() => {
    if (route === 'login' || route === 'search') return;
    const main = document.getElementById('main');
    const h1 = main ? main.querySelector('h1') : document.querySelector('main h1');
    if (h1 && typeof h1.focus === 'function') {
      h1.setAttribute('tabindex', '-1');
      h1.focus();
    }
  }, [route]);

  if (route === 'login') {
    // Preserve test output in background main while also exposing modal when used inside App
    return (
      <>
        <div role="main"><h1>Login</h1><p>Please sign in</p></div>
        <LoginModal onClose={onCloseLogin} onSuccess={onCloseLogin} />
      </>
    );
  }

  if (route === 'dashboard') {
    // Preserve exact tested content, but also enhance with widgets
    return (
      <div role="main">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
        <section aria-labelledby="sys-status">
          <h2 id="sys-status">System Status</h2>
          <div className="cards">
            <div className="card">
              <DataWidget url="/api/status" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (route === 'notifications') {
    return (
      <main role="main">
        <NotificationsCenter />
      </main>
    );
  }

  if (route === 'admin') {
    return (
      <main role="main">
        <AdminTable />
      </main>
    );
  }

  if (route === 'entity-form') {
    return (
      <main role="main">
        <EntityForm />
      </main>
    );
  }

  if (route === 'search') {
    return (
      <>
        <main role="main">
          {/* Background content can be minimal; overlay handles interaction */}
          <h1>Home</h1>
          <p>Welcome home</p>
        </main>
        <SearchOverlay onClose={onCloseSearch} />
      </>
    );
  }

  // Default/Home - must preserve exact test strings
  return <div role="main"><h1>Home</h1><p>Welcome home</p></div>;
}
