// src\pages\TablePage\TablePage.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TablePage.css";

import CategorySection from "../../components/CategorySection/CategorySection";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import TableProductsList from "../../components/TableProductsList/TableProductsList";
import CustomProduct from "../../components/CustomProduct/CustomProduct";
import EditNotes from "../../components/EditNotes/EditNotes";
import useTableProducts from "../../hooks/useTableProducts";
import products from "../../data/products";
import tablesData from "../../data/tables";

export default function TablePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    tablesState,
    addProduct,
    increaseQty,
    decreaseQty,
    setTableNotes,
    getTotal,
    loadAllTables,
    saveTable,
  } = useTableProducts(
    tablesData.map((t) => ({ id: t.id, products: [], notes: "" }))
  );

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [editingTableNotes, setEditingTableNotes] = useState(false);

  // Carica dati dal localStorage
  useEffect(() => {
    loadAllTables();
  }, []);

  const currentTable = tablesState.find((t) => t.id === id) || {
    products: [],
    notes: "",
  };

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

    addProduct(id, product);
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
        tableProducts={currentTable.products}
        onIncrease={(pid) => increaseQty(id, pid)}
        onDecrease={(pid) => decreaseQty(id, pid)}
        total={getTotal(id)}
        setTableProducts={(newProducts) => {
          const tIndex = tablesState.findIndex((t) => t.id === id);
          if (tIndex !== -1) {
            tablesState[tIndex].products = newProducts;
            saveTable(id);
          }
        }}
        tableNotes={currentTable.notes}
        onTableClick={() => setEditingTableNotes(true)}
        goToFullPage={() => {}}
        setTableNotes={setTableNotes}
      />

      {/* Modali */}
      {showCustomForm && (
        <CustomProduct
          onClose={() => setShowCustomForm(false)}
          onAdd={(p) => {
            addProduct(id, p);
            setShowCustomForm(false);
          }}
        />
      )}

      {editingTableNotes && (
        <EditNotes
          product={{ productName: "Tavolo", notes: currentTable.notes }}
          onSave={(updated) => setTableNotes(id, updated.notes)}
          onClose={() => setEditingTableNotes(false)}
        />
      )}

      <button
        className="goBack"
        onClick={() => navigate("/")}
        style={{ position: "absolute", top: 5, right: 5 }}
      >
        Torna
      </button>
    </main>
  );
}
