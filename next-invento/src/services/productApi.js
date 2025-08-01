import api from "./api.js";

// Fetch all products with optional filters
export const getProducts = (params) => api.get("/products", { params });

// Fetch a single product by ID
export const getProductById = (id) => api.get(`/products/${id}`);

// Create a new product (Admin)
export const createProduct = (productData) =>
  api.post("/products", productData);

// Update a product (Admin)
export const updateProduct = (id, productData) =>
  api.put(`/products/${id}`, productData);

// Delete a product (Admin)
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Fetch unique product attributes for filtering
export const getProductAttributes = () => api.get("/products/attributes");
