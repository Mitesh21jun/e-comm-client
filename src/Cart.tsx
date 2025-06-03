import React from "react";
import { useCartStore } from "./cartStore";

const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 16px #0001",
        padding: 24,
      }}
    >
      <h2 style={{ color: "#2a4d8f" }}>Cart</h2>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: 12 }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const discounted =
                item.product.price -
                ((item.product.price * (item.product.discount ?? 0)) / 100);
              return (
                <tr key={item.product._id}>
                  <td>{item.product.name}</td>
                  <td>₹{discounted}</td>
                  <td>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
                      }
                      style={{
                        padding: '2px 8px',
                        marginRight: 4,
                        fontSize: 18,
                        borderRadius: 6,
                        border: '1px solid #bfc8e6',
                        background: item.quantity === 1 ? '#f0f2f8' : '#e6edfa',
                        color: '#2a4d8f',
                        cursor: item.quantity === 1 ? 'not-allowed' : 'pointer',
                        opacity: item.quantity === 1 ? 0.5 : 1,
                        boxShadow: '0 1px 2px #0001',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      disabled={item.quantity === 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span style={{ minWidth: 32, display: 'inline-block', textAlign: 'center', fontSize: 18, fontWeight: 500 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      style={{
                        padding: '2px 8px',
                        marginLeft: 4,
                        fontSize: 18,
                        borderRadius: 6,
                        border: '1px solid #bfc8e6',
                        background: '#e6edfa',
                        color: '#2a4d8f',
                        cursor: 'pointer',
                        boxShadow: '0 1px 2px #0001',
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </td>
                  <td>₹{discounted * item.quantity}</td>
                  <td>
                    <button onClick={() => removeItem(item.product._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div
        style={{
          marginTop: 24,
          fontWeight: "bold",
          color: "#2a4d8f",
          fontSize: 18,
        }}
      >
        Total: ₹
        {items.reduce(
          (sum, item) =>
            sum +
            (item.product.price -
              ((item.product.price * (item.product.discount ?? 0)) / 100)) *
              item.quantity,
          0
        )}
      </div>
      {items.length > 0 && (
        <div style={{ marginTop: 28, textAlign: 'right' }}>
          <button
            style={{
              background: 'linear-gradient(90deg, #2a4d8f 60%, #4e7be7 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: 18,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px #0001',
              marginTop: 8,
              transition: 'background 0.2s',
            }}
            onClick={() => {
              // Use client-side navigation to prevent page refresh
              window.history.pushState({}, '', '/order');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            type="button"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
