//utils\calcTotal.js

export const calcTotal = (products = []) =>
  products.reduce((tot, p) => tot + (p.price || 0) * (p.qty || 0), 0);
