//src\hooks\useTableProducts.js
import { useState, useCallback } from "react";

export default function useTableProducts(initialTables = []) {
  const [tablesState, setTablesState] = useState(initialTables); // array di tavoli {id, products, notes}

  // Aggiunge un prodotto a un tavolo
  const addProduct = useCallback((tableId, product) => {
    if (!product) return;
    setTablesState((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const existing = t.products?.find((p) => p.id === product.id);
        const newProducts = existing
          ? t.products.map((p) =>
              p.id === product.id ? { ...p, qty: p.qty + 1 } : p
            )
          : [...(t.products || []), { ...product, qty: 1 }];
        return { ...t, products: newProducts };
      })
    );
  }, []);

  // Incrementa quantità
  const increaseQty = useCallback((tableId, productId) => {
    setTablesState((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const newProducts =
          t.products?.map((p) =>
            p.id === productId ? { ...p, qty: p.qty + 1 } : p
          ) || [];
        return { ...t, products: newProducts };
      })
    );
  }, []);

  // Decrementa quantità
  const decreaseQty = useCallback((tableId, productId) => {
    setTablesState((prev) =>
      prev.map((t) => {
        if (t.id !== tableId) return t;
        const newProducts = (t.products || [])
          .map((p) =>
            p.id === productId ? { ...p, qty: Math.max(0, p.qty - 1) } : p
          )
          .filter((p) => p.qty > 0);
        return { ...t, products: newProducts };
      })
    );
  }, []);

  // Modifica note
  const setTableNotes = useCallback((tableId, notes) => {
    setTablesState((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, notes } : t))
    );
  }, []);

  // Totale di un tavolo
  const getTotal = useCallback(
    (tableId) => {
      const t = tablesState.find((t) => t.id === tableId);
      if (!t || !Array.isArray(t.products)) return 0;
      return t.products.reduce(
        (sum, p) => sum + (p.price || 0) * (p.qty || 0),
        0
      );
    },
    [tablesState]
  );

  // Carica tutti i tavoli dal localStorage
  const loadAllTables = useCallback(() => {
    const storedTables = tablesState.map((t) => {
      const saved = localStorage.getItem(`table-${t.id}`);
      if (!saved) return t;
      try {
        const data = JSON.parse(saved);
        return {
          ...t,
          products: Array.isArray(data.products) ? data.products : [],
          notes: data.notes || "",
        };
      } catch {
        return { ...t, products: [], notes: "" };
      }
    });
    setTablesState(storedTables);
  }, [tablesState]);

  // Salva un tavolo nel localStorage
  const saveTable = useCallback(
    (tableId) => {
      const t = tablesState.find((t) => t.id === tableId);
      if (!t) return;
      localStorage.setItem(
        `table-${tableId}`,
        JSON.stringify({ products: t.products || [], notes: t.notes || "" })
      );
    },
    [tablesState]
  );

  return {
    tablesState,
    addProduct,
    increaseQty,
    decreaseQty,
    setTableNotes,
    getTotal,
    loadAllTables,
    saveTable,
  };
}
