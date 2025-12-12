//src\components\CustomProduct\CustomProduct.jsx

import { useState } from "react";
import "./CustomProduct.css"; // puoi creare questo file per lo stile del modal

export default function CustomProduct({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = parseFloat(price);
    if (!name || isNaN(parsedPrice) || parsedPrice < 0) return;

    // Creo un prodotto personalizzato
    onAdd({
      id: `custom-${Date.now()}`, // id unico
      productName: name,
      price: parsedPrice,
      category: "Altro",
      qty: 1,
      notes: notes,
    });

    // Reset dei campi
    setName("");
    setPrice("");
    setNotes("");

    // Chiudo il form
    onClose();
  };

  return (
    <div className="customProductContainer">
      <form className="customProductForm" onSubmit={handleSubmit}>
        <h3>Prodotto personalizzato</h3>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Note:
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Opzionale"
          />
        </label>
        <label>
          Prezzo (€):
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <div className="customProductButtons">
          <button type="submit">Aggiungi</button>
          <button type="button" onClick={onClose}>
            Annulla
          </button>
        </div>
      </form>
    </div>
  );
}
