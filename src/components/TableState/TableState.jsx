//src\components\TableState\TableState.jsx

import { useState } from "react";

export default function TableState({ prodotti }) {
  const [selected, setSelected] = useState(false);

  const baseState = prodotti.length > 0 ? "Occupato" : "Libero";
  const finalState = selected ? "Selezionato" : baseState;

  return (
    <div
      onClick={() => setSelected(!selected)}
      style={{
        padding: "20px",
        margin: "10px",
        border: "2px solid black",
        borderRadius: "10px",
        cursor: "pointer",
        background:
          finalState === "Libero"
            ? "#b2ffb2"
            : finalState === "Occupato"
            ? "#ffb2b2"
            : "#b2d1ff",
      }}
    >
      <h3>Tavolo</h3>
      <p>
        Stato: <strong>{finalState}</strong>
      </p>
      <p>Prodotti presenti: {prodotti.length}</p>
    </div>
  );
}
