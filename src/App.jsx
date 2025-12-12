//src\App.jsx
import "./App.css";
import Table from "./components/Table/Table";
import tablesData from "./data/tables";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableProductsList from "./components/TableProductsList/TableProductsList";
import useTableProducts from "./hooks/useTableProducts";

function App() {
  const navigate = useNavigate();
  const [selectedTableId, setSelectedTableId] = useState(null);

  const {
    tablesState,
    addProduct,
    increaseQty,
    decreaseQty,
    setTableNotes,
    getTotal,
    loadAllTables,
    saveTable,
  } = useTableProducts(
    tablesData.map((t) => ({ id: t.id, products: [], notes: "" }))
  );

  // Carica i tavoli dal localStorage
  useEffect(() => {
    loadAllTables();
  }, []);

  const handleTableClick = (id) => {
    setSelectedTableId(id);
  };

  // Salva ogni volta che cambia la preview
  useEffect(() => {
    if (selectedTableId) saveTable(selectedTableId);
  }, [selectedTableId, tablesState]);

  return (
    <>
      <header>
        <h1>BAR</h1>
      </header>

      <main className="mainLayout">
        <div className="containerTables">
          {tablesState.map((table) => {
            const status =
              selectedTableId === table.id
                ? "selected"
                : table.products?.length > 0
                ? "occupied"
                : "empty";

            return (
              <Table
                key={table.id}
                id={table.id}
                onClick={() => handleTableClick(table.id)}
                status={status}
              />
            );
          })}
        </div>

        {selectedTableId && (
          <div className="tablePreview">
            <TableProductsList
              tableId={selectedTableId}
              tableProducts={
                tablesState.find((t) => t.id === selectedTableId)?.products ??
                []
              }
              onIncrease={(pid) => increaseQty(selectedTableId, pid)}
              onDecrease={(pid) => decreaseQty(selectedTableId, pid)}
              total={getTotal(selectedTableId)}
              setTableProducts={(newProducts) => {
                const tIndex = tablesState.findIndex(
                  (t) => t.id === selectedTableId
                );
                if (tIndex !== -1) {
                  tablesState[tIndex].products = newProducts;
                  saveTable(selectedTableId);
                }
              }}
              tableNotes={
                tablesState.find((t) => t.id === selectedTableId)?.notes ?? ""
              }
              onTableClick={() => {}}
              goToFullPage={() => navigate(`/table/${selectedTableId}`)}
              setTableNotes={setTableNotes} // necessario per liberare tavolo
            />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
