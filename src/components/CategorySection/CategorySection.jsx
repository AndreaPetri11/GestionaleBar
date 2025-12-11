//src\components\CategorySection\CategorySection.jsx
import categories from "../../data/categories";
import CategoryLabel from "../CategoryLabel/CategoryLabel";

export default function CategorySection({ onCategorySelect }) {
  return (
    <section className="categorySection">
      <h1>Categorie</h1>
      {categories.map((category) => (
        <CategoryLabel
          key={category.id}
          categoryName={category.categoryName}
          onClick={() => onCategorySelect(category.categoryName)}
        />
      ))}
    </section>
  );
}
