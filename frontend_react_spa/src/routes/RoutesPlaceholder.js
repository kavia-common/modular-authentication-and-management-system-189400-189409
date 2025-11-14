import React from 'react';

/**
 * PUBLIC_INTERFACE
 * RoutesPlaceholder simulates simple "routing" by rendering a view
 * based on a `route` prop. This avoids introducing react-router for now.
 * 
 * Props:
 * - route: 'home' | 'login' | 'dashboard'
 */
export function RoutesPlaceholder({ route = 'home' }) {
  if (route === 'login') {
    return <div role="main"><h1>Login</h1><p>Please sign in</p></div>;
  }
  if (route === 'dashboard') {
    return <div role="main"><h1>Dashboard</h1><p>Welcome to your dashboard</p></div>;
  }
  return <div role="main"><h1>Home</h1><p>Welcome home</p></div>;
}
