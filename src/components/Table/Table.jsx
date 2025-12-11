//src\components\Table\Table.jsx

import "./Table.css";

export default function Table({ id, onClick }) {
  return (
    <div className="table" onClick={onClick}>
      <h2>{id}</h2>
    </div>
  );
}
