//src\hooks\useTableProducts.js

import { useCallback, useMemo, useState } from "react";

export default function useTableProducts(initial = []) {
  const [tableProducts, setTableProducts] = useState(initial);

  const addProduct = useCallback((product) => {
    if (!product) return;
    setTableProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const increaseQty = useCallback((id) => {
    setTableProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setTableProducts((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty - 1) } : p))
        .filter((p) => p.qty > 0)
    );
  }, []);

  const total = useMemo(
    () =>
      tableProducts.reduce((tot, p) => tot + (p.price || 0) * (p.qty || 0), 0),
    [tableProducts]
  );

  return {
    tableProducts,
    setTableProducts,
    addProduct,
    increaseQty,
    decreaseQty,
    total,
  };
}
