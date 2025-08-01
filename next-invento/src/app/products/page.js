"use client";

import FilterSidebar from "@/components/FilterSidebar.js";
import ProductCard from "@/components/ProductCard.js";
import { getProducts } from "@/services/productApi.js";
import { useCallback, useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getProducts(filters);
      setProducts(data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value) {
        newFilters[name] = value;
      } else {
        delete newFilters[name];
      }
      return newFilters;
    });
  };

  return (
    <div className="flex">
      <FilterSidebar onFilterChange={handleFilterChange} />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-black">Products</h1>
        {loading ? (
          <p className="text-black">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
