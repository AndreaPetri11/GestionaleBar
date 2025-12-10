import "./App.css";
import Table from "./components/Table/Table";
import tables from "./data/tables";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleTableClick = (id) => {
    navigate(`/table/${id}`);
  };

  return (
    <>
      <header>
        <h1>BAR</h1>
      </header>
      <main className="containerTables">
        {tables.map((table, i) => (
          <Table
            key={i}
            id={table.id}
            onClick={() => handleTableClick(table.id)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
