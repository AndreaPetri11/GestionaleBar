//src\components\Buttons\increase_decrease_qnty\IncreaseDecrease.jsx

export const handleIncreaseQty = (id, setTableProducts) => {
  setTableProducts((prev) =>
    prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
  );
};

export const handleDecreaseQty = (id, setTableProducts) => {
  setTableProducts((prev) =>
    prev
      .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
      .filter((p) => p.qty > 0)
  );
};
