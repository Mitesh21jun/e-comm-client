import React, { useState } from 'react';
import { fetchCategories } from './api';

interface Category {
  _id: string;
  name: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  image: string;
}

const AddProduct: React.FC = () => {
  const [form, setForm] = useState<ProductForm>({ name: '', description: '', price: 0, discount: 0, category: '', image: '' });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  React.useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price), discount: Number(form.discount) }),
      });
      if (!res.ok) throw new Error('Failed to add product');
      setForm({ name: '', description: '', price: 0, discount: 0, category: '', image: '' });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      setTimeout(() => setAdded(false), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoFocus
            placeholder="Product name"
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
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Description:</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
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
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Price:</label>
          <input
            name="price"
            type="number"
            min={0}
            value={form.price}
            onChange={handleChange}
            required
            placeholder="0"
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
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Discount (%):</label>
          <input
            name="discount"
            type="number"
            min={0}
            max={100}
            value={form.discount}
            onChange={handleChange}
            placeholder="0"
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
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Image URL:</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Enter image URL"
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
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Category:</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
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
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading || !form.name || !form.price || !form.category || added}
          style={{
            background: '#2a4d8f',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '12px 0',
            fontSize: 17,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 1px 4px #0001',
            marginTop: 8,
            transition: 'background 0.2s',
          }}
        >
          {added ? 'Product Added' : loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
