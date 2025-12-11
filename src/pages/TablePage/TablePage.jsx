//src\pages\TablePage\TablePage.jsx

import { useParams } from "react-router-dom";
import { useState } from "react";
import "./TablePage.css";

import CategorySection from "../../components/CategorySection/CategorySection";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import TableProductsList from "../../components/TableProductsList/TableProductsList";
import useTableProducts from "../../hooks/useTableProducts";
import products from "../../data/products";

export default function TablePage() {
  const { id } = useParams();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);

  const { tableProducts, addProduct, increaseQty, decreaseQty, total } =
    useTableProducts();

  const handleCategorySelect = (categoryName) => {
    const filtered = products.filter((p) => p.category === categoryName);
    setSelectedProducts(filtered);
  };

  const handleAddProduct = (product) => {
    if (!product) return;
    if (product.id === "custom") {
      setShowCustomForm(true);
      return;
    }
    addProduct(product);
  };

  return (
    <main className="containerTablePage">
      <CategorySection onCategorySelect={handleCategorySelect} />

      <ProductsSection
        products={selectedProducts}
        onAddProduct={handleAddProduct}
      />

      <TableProductsList
        tableId={id}
        tableProducts={tableProducts}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        total={total}
      />

      {showCustomForm && (
        <CustomProduct
          onClose={() => setShowCustomForm(false)}
          onAdd={(p) => {
            addProduct(p);
            setShowCustomForm(false);
          }}
        />
      )}
    </main>
  );
}
