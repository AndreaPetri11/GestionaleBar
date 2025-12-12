//src\components\TableProductsList\TableProductsList.jsx
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
  const navigate = useNavigate();

  const handleSaveNotes = (updatedProduct) => {
    setTableProducts(
      tableProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );
  };

  const handleClearTable = () => {
    setTableProducts([]);
    if (setTableNotes) setTableNotes(tableId, "");
    localStorage.removeItem(`table-${tableId}`);
  };

  const handleSaveAndGoBack = () => {
    localStorage.setItem(
      `table-${tableId}`,
      JSON.stringify({ products: tableProducts, notes: tableNotes })
    );
    navigate("/"); // torna alla pagina principale con tavoli
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

      <div className="tableTotal">
        <button className="table-action-btn trash" onClick={handleClearTable}>
          Libera tavolo
        </button>

        <button className="table-action-btn save" onClick={handleSaveAndGoBack}>
          Salva
        </button>

        <button className="table-action-btn edit" onClick={goToFullPage}>
          Modifica
        </button>

        <h4>Totale conto:</h4>
        <p>{total.toFixed(2)}€</p>
      </div>

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
