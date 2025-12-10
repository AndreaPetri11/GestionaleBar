import { useParams } from "react-router-dom";

export default function TablePage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Tavolo {id}</h1>
    </div>
  );
}
