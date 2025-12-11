import { useParams } from "react-router-dom";
import "./TablePage.css";
import categories from "../../data/categories";
import Category from "../../components/categories/Category";
import products from "../../data/products";
import { useState } from "react";

export default function TablePage() {
  const { id } = useParams();

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCategoryClick = (categoryName) => {
    const filtered = products.filter((p) => p.category === categoryName);
    setSelectedProducts(filtered);
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
              {selectedProducts.map((p) => (
                <li key={p.id}>{p.productName}</li>
              ))}
            </ul>
          ) : (
            <p>Seleziona una categoria per vedere i prodotti</p>
          )}
        </div>
      </section>

      <section className="tableSection">
        <h1>Tavolo {id}</h1>
      </section>
    </main>
  );
}
