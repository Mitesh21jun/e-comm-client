import React, { useState } from 'react';

const AddCustomer: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('http://localhost:5000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add customer');
      setSuccess('Customer added successfully!');
      setForm({ name: '', email: '', address: '' });
    } catch {
      setError('Failed to add customer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input name="name"
            style={{
              color: '#000000',
              width: '100%',
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #bfc8e6',
              fontSize: 16,
              background: '#f7f9fc',
              marginTop: 4,
              marginBottom: 0,
              outline: 'none',
              transition: 'border 0.2s',
              boxSizing: 'border-box',
            }}  value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input name="email"
            style={{
              color: '#000000',
              width: '100%',
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #bfc8e6',
              fontSize: 16,
              background: '#f7f9fc',
              marginTop: 4,
              marginBottom: 0,
              outline: 'none',
              transition: 'border 0.2s',
              boxSizing: 'border-box',
            }}
            value={form.email} onChange={handleChange} required type="email" />
        </div>
        <div>
          <label>Address:</label><br />
          <input name="address"
            style={{
              color: '#000000',
              width: '100%',
              padding: '10px 12px',
              borderRadius: 6,
              border: '1px solid #bfc8e6',
              fontSize: 16,
              background: '#f7f9fc',
              marginTop: 4,
              marginBottom: 0,
              outline: 'none',
              transition: 'border 0.2s',
              boxSizing: 'border-box',
            }}
            value={form.address} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Customer'}</button>
      </form>
      {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
};

export default AddCustomer;
