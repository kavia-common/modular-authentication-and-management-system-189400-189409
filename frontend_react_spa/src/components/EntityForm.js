import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * EntityForm renders a simple create/edit form with inline validation.
 *
 * Props:
 * - mode?: 'create'|'edit' (default 'create')
 * - initial?: { name?: string, type?: string, description?: string, status?: 'active'|'disabled' }
 * - onSubmit?: (data) => Promise<void> | void
 * - onCancel?: () => void
 */
function EntityForm({ mode = 'create', initial, onSubmit, onCancel }) {
  const titleRef = useRef(null);
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [status, setStatus] = useState(initial?.status || 'active');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState('');

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!type.trim()) e.type = 'Type is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setBanner('');
    try {
      await new Promise((r) => setTimeout(r, 300));
      await onSubmit?.({ name, type, description, status });
      setBanner('Entity saved successfully.');
    } catch (err) {
      setBanner(err?.message || 'Failed to save entity.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="entity-form-title">
      <h1 id="entity-form-title" tabIndex={-1} ref={titleRef}>
        {mode === 'edit' ? 'Edit Entity' : 'Create Entity'}
      </h1>

      {banner && <div role="alert" className={`alert ${banner.includes('success') ? 'success' : 'error'}`}>{banner}</div>}

      <form onSubmit={submit} aria-busy={submitting} noValidate>
        <div className="field">
          <label htmlFor="ef-name">Name <span aria-hidden="true">*</span></label>
          <input
            id="ef-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'ef-name-err' : undefined}
          />
          {errors.name && <div id="ef-name-err" className="error-text">{errors.name}</div>}
        </div>

        <div className="field">
          <label htmlFor="ef-type">Type <span aria-hidden="true">*</span></label>
          <select
            id="ef-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.type}
            aria-describedby={errors.type ? 'ef-type-err' : undefined}
          >
            <option value="">Select</option>
            <option value="customer">Customer</option>
            <option value="order">Order</option>
            <option value="role">Role</option>
          </select>
          {errors.type && <div id="ef-type-err" className="error-text">{errors.type}</div>}
        </div>

        <div className="field">
          <label htmlFor="ef-desc">Description</label>
          <textarea
            id="ef-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <fieldset className="field">
          <legend>Status</legend>
          <label>
            <input
              type="radio"
              name="status"
              value="active"
              checked={status === 'active'}
              onChange={() => setStatus('active')}
            /> Active
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="disabled"
              checked={status === 'disabled'}
              onChange={() => setStatus('disabled')}
            /> Disabled
          </label>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="btn primary" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save'}
          </button>
          <button type="button" className="btn" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default EntityForm;
