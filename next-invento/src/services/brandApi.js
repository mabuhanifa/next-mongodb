import api from "./api.js";

export const getBrands = () => api.get("/brands");

export const createBrand = (brandData) => api.post("/brands", brandData);

export const updateBrand = (id, brandData) =>
  api.put(`/brands/${id}`, brandData);

export const deleteBrand = (id) => api.delete(`/brands/${id}`);

// Other brand-related API functions can be added here
