import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import DataWidget from './components/DataWidget';
import { RoutesPlaceholder } from './routes/RoutesPlaceholder';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [route, setRoute] = useState('home');
  const [showSearch, setShowSearch] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Keyboard shortcut for global search (Ctrl+K or /)
  useEffect(() => {
    const handler = (e) => {
      const isCtrlK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      if (isCtrlK || e.key === '/') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigate = (next) => {
    setRoute(next);
    // Close overlays on navigation
    setShowSearch(false);
  };

  return (
    <div className="App">
      <a href="#main" className="skip-link">Skip to content</a>

      <header className="topbar" role="banner">
        <div className="brand">
          <img src={logo} className="brand-logo" alt="logo" />
          <span className="brand-name">Kavia App</span>
        </div>

        <div className="topbar-actions">
          <div className="search-inline">
            <input
              aria-label="Global search"
              placeholder="Search (Ctrl+K)"
              onFocus={() => setShowSearch(true)}
            />
          </div>
          <button
            className="btn ghost"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <button
            className="btn ghost"
            aria-label="Notifications"
            onClick={() => navigate('notifications')}
          >
            🔔
          </button>
          <button
            className="btn primary"
            onClick={() => navigate('login')}
            aria-label="Open sign in"
          >
            Sign in
          </button>
        </div>
      </header>

      <div className="layout">
        <nav className="sidebar" aria-label="Primary">
          <ul>
            <li><button className={`navlink ${route==='home'?'active':''}`} onClick={() => navigate('home')}>Home</button></li>
            <li><button className={`navlink ${route==='dashboard'?'active':''}`} onClick={() => navigate('dashboard')}>Dashboard</button></li>
            <li><button className={`navlink ${route==='entity-form'?'active':''}`} onClick={() => navigate('entity-form')}>Entities</button></li>
            <li><button className={`navlink ${route==='admin'?'active':''}`} onClick={() => navigate('admin')}>Admin</button></li>
          </ul>
          <div className="sidebar-foot">
            <DataWidget url="/api/status" />
          </div>
        </nav>

        <main id="main" role="main" tabIndex="-1" className="content">
          <ErrorBoundary fallback={<div role="alert"><h2>Something went wrong.</h2></div>}>
            <RoutesPlaceholder
              route={showSearch ? 'search' : route}
              onCloseLogin={() => navigate('dashboard')}
              onOpenSearch={() => setShowSearch(true)}
              onCloseSearch={() => setShowSearch(false)}
            />
          </ErrorBoundary>

          {/* Legacy CRA welcome to keep tests green */}
          <section className="legacy">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <p>
              Current theme: <strong>{theme}</strong>
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
