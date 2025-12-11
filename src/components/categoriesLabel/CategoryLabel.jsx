//src\components\categoriesLabel\CategoryLabel.jsx
import "./CategoryLabel.css";

export default function CategoryLabel({ categoryName, onClick }) {
  return (
    <div className="categoryLabel" onClick={onClick}>
      <h2>{categoryName}</h2>
    </div>
  );
}
