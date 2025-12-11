// src/pages/TablePage/TablePage.jsx

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TablePage.css";

import CategorySection from "../../components/CategorySection/CategorySection";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import TableProductsList from "../../components/TableProductsList/TableProductsList";
import CustomProduct from "../../components/CustomProduct/CustomProduct";
import EditNotes from "../../components/EditNotes/EditNotes";
import useTableProducts from "../../hooks/useTableProducts";
import products from "../../data/products";

export default function TablePage() {
  const { id } = useParams();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [tableNotes, setTableNotes] = useState("");
  const [editingTableNotes, setEditingTableNotes] = useState(false);

  const {
    tableProducts,
    addProduct,
    increaseQty,
    decreaseQty,
    total,
    setTableProducts,
  } = useTableProducts();

  // Filtra prodotti per categoria
  const handleCategorySelect = (categoryName) => {
    const filtered = products.filter((p) => p.category === categoryName);
    setSelectedProducts(filtered);
  };

  // Aggiunge prodotto al tavolo o apre il form per prodotto personalizzato
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
      {/* Sezione categorie */}
      <CategorySection onCategorySelect={handleCategorySelect} />

      {/* Sezione prodotti */}
      <ProductsSection
        products={selectedProducts}
        onAddProduct={handleAddProduct}
      />

      {/* Lista prodotti del tavolo */}
      <TableProductsList
        tableId={id}
        tableProducts={tableProducts}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        total={total}
        setTableProducts={setTableProducts} // per editare note prodotti
        onTableClick={() => setEditingTableNotes(true)}
        tableNotes={tableNotes}
      />

      {/* Modali: prodotto personalizzato e note tavolo */}
      <>
        {showCustomForm && (
          <CustomProduct
            onClose={() => setShowCustomForm(false)}
            onAdd={(p) => {
              addProduct(p);
              setShowCustomForm(false);
            }}
          />
        )}

        {editingTableNotes && (
          <EditNotes
            product={{ productName: "Tavolo", notes: tableNotes }}
            onSave={(updated) => setTableNotes(updated.notes)}
            onClose={() => setEditingTableNotes(false)}
          />
        )}
      </>
    </main>
  );
}
