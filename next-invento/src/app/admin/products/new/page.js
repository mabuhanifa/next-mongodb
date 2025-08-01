"use client";

import ProductForm from "@/components/ProductForm.js";
import ProtectedRoute from "@/components/ProtectedRoute.js";
import { createProduct } from "@/services/productApi.js";

function NewProductPageContent() {
  const handleSubmit = async (productData) => {
    try {
      await createProduct(productData);
      // Optional: show success toast
    } catch (error) {
      console.error("Failed to create product:", error);
      // Optional: show error toast
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Create New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}

export default function NewProductPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <NewProductPageContent />
    </ProtectedRoute>
  );
}
