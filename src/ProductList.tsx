import React, { useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "./api";
import { useCartStore } from "./cartStore";
import { Link } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  category: string;
}

const placeholderImg = "https://via.placeholder.com/150";

const ProductList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchProducts().then(setProducts);
  }, []);

  function getProductsByCategory(catId: string) {
    return products.filter((p) => p.category === catId);
  }

  return (
    <div style={{ padding: "24px", background: "#f4f6fb" }}>
      {categories.map((cat) => (
        <div
          key={cat._id}
          style={{
            marginBottom: 32,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px #0001",
            padding: 16,
          }}
        >
          <Link
            to={`/category/${cat._id}`}
            style={{ textDecoration: "none", color: "#2a4d8f" }}
          >
            <h2
              style={{ color: "#2a4d8f", fontSize: "1.5rem", marginBottom: 16 }}
            >
              {cat.name}
            </h2>
          </Link>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {getProductsByCategory(cat._id).map((product) => (
              <div
                key={product._id}
                className="product-card"
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #0001",
                  padding: 16,
                  textAlign: "center",
                  width: 200,
                }}
              >
                <img
                  src={product.image || placeholderImg}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.2rem",
                    margin: "12px 0",
                    color: "#333",
                  }}
                >
                  {product.name}
                </h3>
                <div>
                  <span
                    className="price"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "#2a4d8f",
                    }}
                  >
                    ₹
                    {product.price -
                      (product.price * (product.discount ?? 0)) / 100}
                  </span>
                  {product.discount ? (
                    <span
                      className="old-price"
                      style={{
                        fontSize: "0.9rem",
                        textDecoration: "line-through",
                        color: "#888",
                        marginLeft: 8,
                      }}
                    >
                      ₹{product.price}
                    </span>
                  ) : null}
                </div>
                <button
                  style={{
                    marginTop: 12,
                    background: "#2a4d8f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onClick={() => addItem(product)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#1a3b6f")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#2a4d8f")
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
