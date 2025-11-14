import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ErrorBoundary is a React component that catches JavaScript errors anywhere in
 * its child component tree, logs those errors, and displays a fallback UI.
 * 
 * Props:
 * - fallback?: React.ReactNode - Fallback UI to render when an error occurs.
 * 
 * Returns:
 * - Children when no error, otherwise renders the provided fallback or a default message.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, errorInfo) {
    // In a real app we could log to a remote service here.
    // console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      return this.props.fallback || (
        <div role="alert" aria-live="assertive">
          <h2>Something went wrong.</h2>
          <p>{errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
