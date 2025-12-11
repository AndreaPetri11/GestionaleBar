import "../categories/category.css";

export default function Category({ categoryName, onClick }) {
  return (
    <div className="categoryLabel" onClick={onClick}>
      <h2>{categoryName}</h2>
    </div>
  );
}
