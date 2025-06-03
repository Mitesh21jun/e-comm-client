import React, { useState } from 'react';
import { useCartStore } from './cartStore';
import { placeOrder } from './api';
import { useNavigate } from 'react-router-dom';

const OrderForm: React.FC = () => {
  const items = useCartStore(state => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const total = items.reduce(
    (sum, item) => sum + (item.product.price - ((item.product.price * (item.product.discount ?? 0)) / 100)) * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Place order with customer object (do not create customer separately)
      const order = {
        customer,
        items: items.map(i => ({
          product: i.product._id,
          quantity: i.quantity,
          price: i.product.price - ((i.product.price * (i.product.discount ?? 0)) / 100),
        })),
        total,
      };
      await placeOrder(order);
      setSuccess('Order placed successfully!');
      clearCart();
      setTimeout(() => navigate('/'), 2000);
    } catch {
      setError('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 16px #0001', padding: 24 }}>
      <h2 style={{ color: '#2a4d8f' }}>Place Order</h2>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: '#2a4d8f', marginBottom: 8 }}>Cart Summary</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Product</th>
              <th style={{ textAlign: 'left' }}>Price</th>
              <th style={{ textAlign: 'left' }}>Qty</th>
              <th style={{ textAlign: 'left' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const discounted = item.product.price - ((item.product.price * (item.product.discount ?? 0)) / 100);
              return (
                <tr key={item.product._id}>
                  <td>{item.product.name}</td>
                  <td>₹{discounted}</td>
                  <td>{item.quantity}</td>
                  <td>₹{discounted * item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ fontWeight: 'bold', color: '#2a4d8f', fontSize: 16, marginBottom: 8 }}>Total: ₹{total}</div>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Name:</label>
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            autoFocus
            placeholder="Your name"
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
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Email:</label>
          <input
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="Email"
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
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 500, color: '#2a4d8f', marginBottom: 6, display: 'block' }}>Address:</label>
          <input
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
            placeholder="Address"
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
          />
        </div>
        <button
          type="submit"
          disabled={loading}
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
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
    </div>
  );
};

export default OrderForm;
