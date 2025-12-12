//src\components\EditNotes\EditNotes.jsx

import { useState } from "react";
import "./EditNotes.css";

export default function EditNotes({ product, onSave, onClose }) {
  const [notes, setNotes] = useState(product.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, notes });
    onClose();
  };

  return (
    <div className="editNotesModal">
      <form className="editNotesForm" onSubmit={handleSubmit}>
        <h3>Modifica Note</h3>
        <label>
          Note:
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Opzionale"
          />
        </label>
        <div className="editNotesButtons">
          <button type="submit">Salva</button>
          <button type="button" onClick={onClose}>
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
}
