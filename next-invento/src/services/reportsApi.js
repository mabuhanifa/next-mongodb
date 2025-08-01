import api from "./api.js";

export const getSummaryReport = () => api.get("/reports/summary");

export const getSalesReport = (params) => api.get("/reports/sales", { params });

export const getProfitReport = (params) =>
  api.get("/reports/profit", { params });
