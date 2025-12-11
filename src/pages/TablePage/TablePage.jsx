import { useParams } from "react-router-dom";
import "./TablePage.css";
import categories from "../../data/categories";
import Category from "../../components/categories/Category";
import products from "../../data/products";
import { useState } from "react";

export default function TablePage() {
  const { id } = useParams();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tableProducts, setTableProducts] = useState([]);

  const handleCategoryClick = (categoryName) => {
    const filtered = products.filter((p) => p.category === categoryName);
    setSelectedProducts(filtered);
  };

  const handleAddProduct = (product) => {
    setTableProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);

      if (existing) {
        // se esiste aumento la quantità
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }

      // altrimenti lo aggiungo con qty = 1
      return [...prev, { ...product, qty: 1 }];
    });
  };
  return (
    <main className="containerTablePage">
      <section className="categorySection">
        <h1>Categorie</h1>
        {categories.map((category) => (
          <Category
            key={category.id}
            categoryName={category.categoryName}
            onClick={() => handleCategoryClick(category.categoryName)}
          />
        ))}
      </section>

      <section className="productsSection">
        <h1>Prodotti</h1>
        <div className="">
          {selectedProducts.length > 0 ? (
            <ul className="productList">
              {[...selectedProducts]
                .sort((a, b) => a.productName.localeCompare(b.productName))
                .map((p) => (
                  <li key={p.id} onClick={() => handleAddProduct(p)}>
                    {p.productName}
                  </li>
                ))}
            </ul>
          ) : (
            <p>Seleziona una categoria</p>
          )}
        </div>
      </section>

      <section className="tableSection">
        <h1 className="selectedTable">Tavolo {id}</h1>
        <div className="descriptionTable">
          <h3 className="col-product">Prodotti</h3>
          <h3 className="col-qty">Quantità</h3>
          <h3 className="col-price">Prezzo</h3>
        </div>
        <div className="tableProductsList">
          <div>
            {tableProducts.length > 0 ? (
              tableProducts.map((item) => (
                <div key={item.id} className="addedProducts">
                  <span className="col-product">{item.productName}</span>
                  <span className="col-qty">{item.qty}</span>
                  <span className="col-price">{item.price || "-"}</span>
                </div>
              ))
            ) : (
              <p>Nessun prodotto aggiunto</p>
            )}{" "}
          </div>
        </div>

        <div className="tableTotal">
          <h4>Totale conto:</h4>
          <p>
            {tableProducts
              .reduce((total, p) => total + (p.price || 0) * p.qty, 0)
              .toFixed(2)}
            €
          </p>
        </div>
      </section>
    </main>
  );
}
