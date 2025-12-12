//src\components\Table\Table.jsx

import "./Table.css";
import "../../pages/TablePage/TablePage.css";

export default function Table({ id, onClick, status }) {
  return (
    <div className={`table ${status}`} onClick={onClick}>
      <h2>{id}</h2>
    </div>
  );
}
