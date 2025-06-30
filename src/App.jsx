import { useState, useEffect } from "react";
import ProductForm from "./components/ProductAdd";
import ProductList from "./components/ProductList";
import ProductEdit from "./components/ProductEdit";

export default function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Cargar productos del localStorage solo una vez
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setProducts(parsed);
      } catch (e) {
        console.error("Error al parsear localStorage:", e);
      }
    }
  }, []);

  // Guardar productos, pero solo si hay al menos uno
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const handleAddProduct = (newProduct) => {
    newProduct.id = Date.now();
    setProducts((prev) => [...prev, newProduct]);
    setShowForm(false);
  };

  const handleDeleteProduct = (product) => {
    const updated = products.filter((p) => p.id !== product.id);
    setProducts(updated);

    // Si la lista queda vacía, también limpiamos el localStorage
    if (updated.length === 0) {
      localStorage.removeItem("products");
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showForm ? (
        <ProductForm
          onAdd={handleAddProduct}
          onCancel={() => setShowForm(false)}
        />
      ) : editingProduct ? (
        <ProductEdit
          product={editingProduct}
          onUpdate={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      ) : (
        <ProductList
          products={products}
          onDelete={handleDeleteProduct}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(false);
          }}
          onAddNew={() => setShowForm(true)}
        />
      )}
    </div>
  );
}
