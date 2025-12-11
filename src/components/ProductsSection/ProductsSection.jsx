//src\components\ProductsSection\ProductsSection.jsx

export default function ProductsSection({ products, onAddProduct }) {
  return (
    <section className="productsSection">
      <h1>Prodotti</h1>
      <div>
        {products && products.length > 0 ? (
          <ul className="productList">
            {[...products]
              .sort((a, b) => a.productName.localeCompare(b.productName))
              .map((p) => (
                <li key={p.id} onClick={() => onAddProduct(p)}>
                  {p.productName}
                </li>
              ))}
          </ul>
        ) : (
          <p>Seleziona una categoria</p>
        )}
      </div>
    </section>
  );
}
