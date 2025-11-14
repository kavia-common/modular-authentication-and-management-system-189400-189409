import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * LoginModal is an accessible authentication dialog with basic client-side validation.
 *
 * Props:
 * - onClose: () => void - invoked when the modal should be closed
 * - onSuccess?: () => void - invoked after a successful "login"
 */
function LoginModal({ onClose, onSuccess }) {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const lastActiveRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Store the invoker to restore focus after close
  useEffect(() => {
    lastActiveRef.current = document.activeElement;
  }, []);

  // Focus management when opening
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  // Trap focus within dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        );
        const nodes = Array.from(focusable);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const current = dialogRef.current;
    current?.addEventListener('keydown', handleKeyDown);
    return () => current?.removeEventListener('keydown', handleKeyDown);
  }, []);

  const validate = () => {
    if (!email) {
      setError('Email is required.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate auth
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    if (email.toLowerCase().includes('fail')) {
      setError('Invalid credentials');
      return;
    }
    onSuccess?.();
    handleClose();
  };

  const handleClose = () => {
    onClose?.();
    // restore focus
    setTimeout(() => {
      try {
        lastActiveRef.current?.focus?.();
      } catch (_) {
        // ignore
      }
    }, 0);
  };

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      aria-hidden="false"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        ref={dialogRef}
      >
        <div className="modal-header">
          <h2 id="login-title" tabIndex={-1} ref={titleRef}>
            Sign In
          </h2>
          <button className="btn ghost" onClick={handleClose} aria-label="Close dialog">✕</button>
        </div>
        <form onSubmit={handleSubmit} aria-busy={submitting}>
          {error && (
            <div role="alert" className="alert error">
              {error}
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error && !email}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!error && !password}
            />
          </div>
          <div className="field checkbox">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
            <button type="button" className="btn" disabled={submitting} onClick={handleClose}>
              Cancel
            </button>
          </div>
          <div className="sub-actions">
            <button type="button" className="btn ghost" disabled={submitting} title="Single Sign-On">
              Use SSO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
