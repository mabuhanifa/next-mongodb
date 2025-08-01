import api from "./api.js";

export const getCategories = () => api.get("/categories");

export const createCategory = (categoryData) =>
  api.post("/categories", categoryData);

export const updateCategory = (id, categoryData) =>
  api.put(`/categories/${id}`, categoryData);

export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Other category-related API functions can be added here
