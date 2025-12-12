// src\components\TableProductsList\TableProductsList.jsx

import EditNotes from "../EditNotes/EditNotes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TableProductsList({
  tableId,
  tableProducts,
  onIncrease,
  onDecrease,
  total,
  setTableProducts,
  onTableClick,
  tableNotes,
  goToFullPage,
}) {
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  // Aggiorna le note di un prodotto
  const handleSaveNotes = (updatedProduct) => {
    setTableProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <section className="tableSection">
      {/* Titolo tavolo sempre visibile */}

      <button className="goBack" onClick={() => navigate("/")}>
        X
      </button>
      <div className="containerTitleTable">
        <h1
          className="selectedTable"
          onClick={onTableClick}
          style={{ cursor: "pointer" }}
        >
          Tavolo {tableId} {tableNotes && `(${tableNotes})`}
        </h1>
      </div>

      {/* Wrapper scrollabile per lista prodotti */}
      <div className="tableProductsWrapper">
        {/* Intestazioni colonne sticky */}
        <div className="descriptionTable">
          <h3 className="col-product">Prodotti</h3>
          <h3 className="col-qty">Quantità</h3>
          <h3 className="col-price">Prezzo</h3>
        </div>

        {/* Lista prodotti */}
        <div className="tableProductsList">
          {tableProducts.length > 0 ? (
            tableProducts.map((item) => (
              <div key={item.id} className="addedProducts">
                <span
                  className="col-product"
                  onClick={() => setEditingProduct(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.productName} {item.notes && `(${item.notes})`}
                </span>

                <span className="col-qty">
                  <button
                    className="qty-btn"
                    onClick={() => onDecrease(item.id)}
                  >
                    -
                  </button>
                  {item.qty}
                  <button
                    className="qty-btn"
                    onClick={() => onIncrease(item.id)}
                  >
                    +
                  </button>
                </span>

                <span className="col-price">
                  {(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <p style={{ padding: "10px" }}>Nessun prodotto aggiunto</p>
          )}
        </div>
      </div>

      {/* Totale conto */}
      <div className="tableTotal">
        <button className="trash">Libera tavolo</button>
        <button
          className="save"
          onClick={() =>
            localStorage.setItem(
              `tavolo-${tableId}`,
              JSON.stringify(tableProducts)
            )
          }
        >
          Salva
        </button>

        <button className="edit" onClick={goToFullPage}>
          Modifica
        </button>

        <h4>Totale conto:</h4>
        <p>{total.toFixed(2)}€</p>
      </div>

      {/* Form per modificare note prodotto */}
      {editingProduct && (
        <EditNotes
          product={editingProduct}
          onSave={handleSaveNotes}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </section>
  );
}
