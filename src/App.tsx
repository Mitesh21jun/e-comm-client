import "./App.css";
import ProductList from "./ProductList";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddCustomer from "./AddCustomer";
import { useCartStore } from "./cartStore";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import type { Product } from "./cartStore";
import Cart from "./Cart";
import OrderForm from "./OrderForm";
import ProductDetail from "./ProductDetail";
import CategoryProducts from "./CategoryProducts";

const Suggestions: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts().then((data) => {
      // Shuffle and pick 5 random products
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 5));
    });
  }, []);

  const handleAdd = (product: Product) => {
    addItem(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (!products.length) return null;

  return (
    <div style={{ margin: "32px 0" }}>
      <h2 style={{ color: "#2a4d8f" }}>You might also like</h2>
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <div>
              <span className="price">
                ₹
                {product.price -
                  (product.price * (product.discount ?? 0)) / 100}
              </span>
              {product.discount ? (
                <span className="old-price">₹{product.price}</span>
              ) : null}
            </div>
            <button
              style={{ marginTop: 8 }}
              onClick={() => handleAdd(product)}
              disabled={addedId === product._id}
            >
              {addedId === product._id ? "Product Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// New Global Navbar component
const Navbar: React.FC = () => {
  console.log("navbar rendered");
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();
  return (
    <nav
      style={{
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 12px #0001",
        padding: "0 32px",
        minHeight: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        zIndex: 1000,
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Link
          to="/"
          style={{
            fontWeight: 700,
            fontSize: 20,
            color: "#2a4d8f",
            letterSpacing: 1,
            textDecoration: "none",
          }}
        >
          E-Comm Store
        </Link>
        {[
          { to: "/", label: "Home" },
          { to: "/cart", label: "Cart" },
          { to: "/order", label: "Order" },
          { to: "/add-product", label: "Add Product" },
          { to: "/add-category", label: "Add Category" },
          { to: "/add-customer", label: "Add Customer" },
        ].map(({ to, label }) => (
          <Link key={to} to={to} className="nav-link">
            {label}
          </Link>
        ))}
      </div>
      <button
        onClick={() => navigate("/cart")}
        style={{
          background: "#fff",
          border: "1.5px solid #b3c6f7",
          borderRadius: "50%",
          width: 40,
          height: 40,
          padding: 0,
          margin: "0 0 0 0",
          transform: "translateX(-110%)",
          cursor: "pointer",
          position: "relative",
          boxShadow: "0 2px 8px #0001",
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border 0.2s, box-shadow 0.2s",
        }}
        aria-label="View cart"
      >
        <span
          role="img"
          aria-label="cart"
          style={{ fontSize: 22, color: "#2a4d8f", verticalAlign: "middle" }}
        >
          🛒
        </span>
        {items.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -6,
              background: "#e74c3c",
              color: "#fff",
              borderRadius: "50%",
              fontSize: 12,
              fontWeight: 600,
              minWidth: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
              boxShadow: "0 1px 4px #0002",
            }}
          >
            {items.length}
          </span>
        )}
      </button>
    </nav>
  );
};

function App() {
  console.log("App component rendered");
  return (
    <>
      <Navbar />
      <div style={{ marginTop: 80, padding: "0 16px" }}>
        <h1 style={{ color: "#2a4d8f", textAlign: "center" }}>
          Welcome to E-Comm Store
        </h1>
        <p style={{ textAlign: "center", color: "#555" }}>
          Explore our products and add them to your cart!
        </p>

        <hr style={{ margin: "16px 0", borderColor: "#b3c6f7" }} />
        <div style={{ maxWidth: 1200, margin: "10 auto" }} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProductList />
              <Suggestions />
            </>
          }
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
      </Routes>
    </>
  );
}

export default App;
