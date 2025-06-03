import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "./cartStore";

const placeholderImg = "https://via.placeholder.com/150";

async function fetchProductsByCategory(categoryId: string) {
  const res = await fetch(
    `http://localhost:5000/products/category/${categoryId}`
  );
  return res.json();
}

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  description?: string;
  category: string | { _id: string; name: string; __v?: number };
}

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      fetchProductsByCategory(categoryId).then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {showPopup && popupProduct && (
        <div
          style={{
            position: "fixed",
            top: 40,
            right: 40,
            zIndex: 2000,
            background: "#2a4d8f",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: 10,
            boxShadow: "0 4px 24px #0003",
            fontSize: 18,
            fontWeight: 500,
            transition: "opacity 0.3s",
          }}
        >
          {popupProduct} added to cart!
        </div>
      )}
      {products.length === 0 && (
        <div
          style={{
            color: "#888",
            fontSize: 18,
            margin: "32px 0",
            textAlign: "center",
          }}
        >
          There is no product in this category.
        </div>
      )}
      {products.map((product) => (
        <>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div
              key={product._id}
              className="product-card"
              style={{ width: 320, alignItems: "flex-start" }}
            >
              <img
                src={product.image || placeholderImg}
                alt={product.name}
                style={{
                  width: "100%",
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 8,
                  marginBottom: 10,
                }}
              />
              <h3 style={{ margin: "0.5em 0 0.2em 0", color: "#2a4d8f" }}>
                {product.name}
              </h3>
              <div style={{ marginBottom: 6, color: "#444", fontSize: 15 }}>
                {product.description || (
                  <span style={{ color: "#aaa" }}>
                    No description available.
                  </span>
                )}
              </div>
              <div style={{ marginBottom: 8 }}>
                <span className="price">
                  ₹
                  {product.price -
                    (product.price * (product.discount ?? 0)) / 100}
                </span>
                {product.discount ? (
                  <span className="old-price">₹{product.price}</span>
                ) : null}
              </div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
                <span>
                  Category:{" "}
                  {typeof product.category === "object" &&
                  product.category !== null
                    ? product.category.name
                    : product.category}
                </span>
              </div>
              <button
                style={{ marginTop: 8 }}
                onClick={() => {
                  const productForCart = {
                    ...product,
                    category:
                      typeof product.category === "object" &&
                      product.category !== null
                        ? product.category._id
                        : product.category,
                  };
                  addItem(productForCart);
                  setPopupProduct(product.name);
                  setShowPopup(true);
                  setTimeout(() => setShowPopup(false), 1500);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CategoryProducts;
