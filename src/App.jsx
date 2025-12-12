//src\App.jsx

import "./App.css";
import Table from "./components/Table/Table";
import tables from "./data/tables";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TableProductsList from "./components/TableProductsList/TableProductsList";
import useTableProducts from "./hooks/useTableProducts";

function App() {
  const navigate = useNavigate();
  const [selectedTableId, setSelectedTableId] = useState(null);
  const handleTableClick = (id) => {
    setSelectedTableId(id);
  };

  const {
    tableProducts,
    addProduct,
    increaseQty,
    decreaseQty,
    total,
    setTableProducts,
  } = useTableProducts();

  return (
    <>
      <header>
        <h1>BAR</h1>
      </header>

      <main className="mainLayout">
        {/* Sinistra: tavoli */}
        <div className="containerTables">
          {tables.map((table, i) => (
            <Table
              key={i}
              id={table.id}
              onClick={() => handleTableClick(table.id)}
            />
          ))}
        </div>

        {/* Destra: dettaglio tavolo, visibile solo se selezionato */}
        {selectedTableId && (
          <div className="tableSidePanel">
            <TableProductsList
              tableId={selectedTableId}
              tableProducts={tableProducts}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
              total={total}
              setTableProducts={setTableProducts}
              onTableClick={() => {}}
              tableNotes={""}
              goToFullPage={() => navigate(`/table/${selectedTableId}`)}
            />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
