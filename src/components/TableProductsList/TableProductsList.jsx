//src\components\TableProductsList\TableProductsList.jsx

export default function TableProductsList({
  tableId,
  tableProducts,
  onIncrease,
  onDecrease,
  total,
}) {
  return (
    <section className="tableSection">
      <h1 className="selectedTable">Tavolo {tableId}</h1>

      <div className="descriptionTable">
        <h3 className="col-product">Prodotti</h3>
        <h3 className="col-qty">Quantità</h3>
        <h3 className="col-price">Prezzo</h3>
      </div>

      <div className="tableProductsList">
        {tableProducts.length > 0 ? (
          tableProducts.map((item) => (
            <div key={item.id} className="addedProducts">
              <span className="col-product">{item.productName}</span>

              <span className="col-qty">
                <button className="qty-btn" onClick={() => onDecrease(item.id)}>
                  -
                </button>

                {item.qty}

                <button className="qty-btn" onClick={() => onIncrease(item.id)}>
                  +
                </button>
              </span>

              <span className="col-price">
                {(item.price * item.qty).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p>Nessun prodotto aggiunto</p>
        )}
      </div>

      <div className="tableTotal">
        <h4>Totale conto:</h4>
        <p>{total.toFixed(2)}€</p>
      </div>
    </section>
  );
}
