import api from "./api.js";

export const getInventory = () => api.get("/inventory");

export const addStock = (stockData) => api.post("/inventory/add", stockData);

export const getLowStock = (threshold) =>
  api.get("/inventory/low-stock", { params: { threshold } });
