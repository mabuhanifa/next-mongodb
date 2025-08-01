"use client";

import { getProductById } from "@/services/productApi.js";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const { data } = await getProductById(id);
          setProduct(data.data);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading)
    return <div className="text-center p-10 text-black">Loading...</div>;
  if (!product)
    return (
      <div className="text-center p-10 text-black">Product not found.</div>
    );

  return (
    <div className="container mx-auto p-6 text-black">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to All Products
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {/* Placeholder for image gallery */}
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-3xl font-extrabold text-indigo-600 mb-4">
              ${product.price}
            </p>
            <div className="space-y-2">
              <p>
                <strong>Brand:</strong> {product.brand?.name}
              </p>
              <p>
                <strong>Category:</strong> {product.category?.name}
              </p>
              <p>
                <strong>Stock:</strong>{" "}
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </p>
              {product.attributes?.color && (
                <p>
                  <strong>Color:</strong> {product.attributes.color}
                </p>
              )}
              {product.attributes?.size && (
                <p>
                  <strong>Size:</strong> {product.attributes.size}
                </p>
              )}
              {product.attributes?.type && (
                <p>
                  <strong>Type:</strong> {product.attributes.type}
                </p>
              )}
              {product.tags?.length > 0 && (
                <p>
                  <strong>Tags:</strong> {product.tags.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
