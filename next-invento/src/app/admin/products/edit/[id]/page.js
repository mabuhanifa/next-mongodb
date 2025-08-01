"use client";

import ProductForm from "@/components/ProductForm.js";
import ProtectedRoute from "@/components/ProtectedRoute.js";
import { getProductById, updateProduct } from "@/services/productApi.js";
import { use, useEffect, useState } from "react";

function EditProductPageContent({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data.data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (productData) => {
    try {
      await updateProduct(id, productData);
      // Optional: show success toast
    } catch (error) {
      console.error("Failed to update product:", error);
      // Optional: show error toast
    }
  };

  if (loading)
    return <div className="text-center p-10 text-black">Loading...</div>;
  if (!product)
    return (
      <div className="text-center p-10 text-black">Product not found.</div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}

export default function EditProductPage({ params }) {
  return (
    <ProtectedRoute adminOnly={true}>
      <EditProductPageContent params={params} />
    </ProtectedRoute>
  );
}
