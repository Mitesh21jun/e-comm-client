import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from './api';
import { useCartStore } from './cartStore';

const placeholderImg = 'https://via.placeholder.com/300x200';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchProductById(id).then(setProduct);
  }, [id]);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 16px #0001', padding: 24, position: 'relative' }}>
      <img src={product.image || placeholderImg} alt={product.name} style={{ width: '100%', height: 240, objectFit: 'cover', borderRadius: 8, marginBottom: 16 }} />
      <h2 style={{ color: '#2a4d8f' }}>{product.name}</h2>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontWeight: 'bold', fontSize: 20, color: '#1a2a4d' }}>₹{product.price - ((product.price * (product.discount ?? 0)) / 100)}</span>
        {product.discount ? (
          <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8, fontSize: 18 }}>₹{product.price}</span>
        ) : null}
      </div>
      <p style={{ color: '#444', marginBottom: 18 }}>{product.description}</p>
      <div style={{ marginTop: 16 }}>
        <button
          onClick={handleAddToCart}
          disabled={added}
          style={{
            background: added ? '#bfc8e6' : '#2a4d8f',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 28px',
            fontSize: 17,
            fontWeight: 600,
            cursor: added ? 'not-allowed' : 'pointer',
            boxShadow: '0 1px 4px #0001',
            transition: 'background 0.2s',
          }}
        >
          {added ? 'Product Added' : 'Add to Cart'}
        </button>
        <button
          style={{
            marginLeft: 12,
            background: '#1a2a4d',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 28px',
            fontSize: 17,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #0001',
            transition: 'background 0.2s',
          }}
          onClick={() => {
            addItem(product);
            navigate('/cart');
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
