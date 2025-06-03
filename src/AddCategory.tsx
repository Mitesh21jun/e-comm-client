import React, { useState } from 'react';

const AddCategory: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('http://localhost:5000/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Failed to add category');
      setSuccess('Category added successfully!');
      setName('');
    } catch {
      setError('Failed to add category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input name="name" value={name}
            style={{
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
            onChange={e => setName(e.target.value)} required />
        </div>
        <br />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Category'}</button>
      </form>
      {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
};

export default AddCategory;
