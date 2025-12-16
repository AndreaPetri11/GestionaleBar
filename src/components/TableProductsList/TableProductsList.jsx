// src/components/TableProductsList/TableProductsList.jsx

import EditNotes from "../EditNotes/EditNotes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TableProductsList.css";

export default function TableProductsList({
  tableId,
  tableProducts = [],
  onIncrease,
  onDecrease,
  total = 0,
  setTableProducts,
  onTableClick,
  tableNotes = "",
  goToFullPage,
  setTableNotes, // necessario per liberare tavolo e reset note
}) {
  const [editingProduct, setEditingProduct] = useState(null);

  // 🔹 Stato per "Dividi conto"
  const [showSplit, setShowSplit] = useState(false);
  const [people, setPeople] = useState(1);

  // 🔹 Stato per conferma "Libera tavolo"
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const navigate = useNavigate();

  const quota = people > 0 ? (total / people).toFixed(2) : "0.00";

  const handleSaveNotes = (updatedProduct) => {
    setTableProducts(
      tableProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  const confirmClearTable = () => {
    setTableProducts([]);
    if (setTableNotes) setTableNotes(tableId, "");
    localStorage.removeItem(`table-${tableId}`);
    setShowConfirmClear(false);
  };

  const cancelClearTable = () => {
    setShowConfirmClear(false);
  };

  const handleSaveAndGoBack = () => {
    localStorage.setItem(
      `table-${tableId}`,
      JSON.stringify({ products: tableProducts, notes: tableNotes })
    );
    navigate("/");
  };

  const openSplit = () => {
    setPeople(1);
    setShowSplit(true);
  };

  return (
    <section className="tableSection">
      <div className="containerTitleTable">
        <h1
          className="selectedTable"
          onClick={onTableClick}
          style={{ cursor: "pointer" }}
        >
          Tavolo {tableId} {tableNotes && `(${tableNotes})`}
        </h1>
      </div>

      <div className="tableProductsWrapper">
        <div className="descriptionTable">
          <h3 className="col-product">Prodotti</h3>
          <h3 className="col-qty">Quantità</h3>
          <h3 className="col-price">Prezzo</h3>
        </div>

        <div className="tableProductsList">
          {tableProducts.length > 0 ? (
            tableProducts.map((item) => (
              <div key={item.id} className="addedProducts">
                <span
                  className="col-product"
                  onClick={() => setEditingProduct(item)}
                  style={{ cursor: "pointer" }}
                >
                  {item.productName}
                  {item.notes && (
                    <span className="product-notes"> ({item.notes})</span>
                  )}
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

      <div className="tableTotal">
        <div className="topRow">
          <button className="table-action-btn split" onClick={openSplit}>
            Dividi conto
          </button>
          <div className="totalAmount">Totale conto: €{total.toFixed(2)}</div>
        </div>

        <div className="bottomRow">
          <button
            className="table-action-btn trash"
            onClick={() => setShowConfirmClear(true)}
          >
            Libera tavolo
          </button>

          <button className="table-action-btn edit" onClick={goToFullPage}>
            Modifica
          </button>

          <button
            className="table-action-btn save"
            onClick={handleSaveAndGoBack}
          >
            Salva
          </button>
        </div>

        {showSplit && (
          <div className="splitBillBox">
            <label>
              Numero paganti
              <input
                type="number"
                min="1"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
              />
            </label>

            <div className="splitResult">
              Quota per persona:
              <strong> € {quota}</strong>
            </div>

            <button
              className="table-action-btn close"
              onClick={() => setShowSplit(false)}
            >
              Chiudi
            </button>
          </div>
        )}
      </div>

      {/* Modal conferma "Libera tavolo" */}
      {showConfirmClear && (
        <div className="confirmModal">
          <div className="confirmBox">
            <p>Sei sicuro che vuoi liberare il tavolo?</p>
            <div className="confirmButtons">
              <button
                className="table-action-btn yes"
                onClick={confirmClearTable}
              >
                SI
              </button>
              <button
                className="table-action-btn no"
                onClick={cancelClearTable}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}

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
