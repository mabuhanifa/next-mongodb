import api from "./api.js";

export const getSales = () => api.get("/sales");

export const createSale = (saleData) => api.post("/sales", saleData);
