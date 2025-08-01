"use client";

import AttributeManager from "@/components/AttributeManager.js";
import ProtectedRoute from "@/components/ProtectedRoute.js";
import {
  createBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "@/services/brandApi.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/services/categoryApi.js";
import { useEffect, useState } from "react";

function AttributesPageContent() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchBrands = async () => {
    try {
      const { data } = await getBrands();
      setBrands(data.data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Manage Attributes</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AttributeManager
          title="Brands"
          items={brands}
          onFetch={fetchBrands}
          onCreate={createBrand}
          onUpdate={updateBrand}
          onDelete={deleteBrand}
        />
        <AttributeManager
          title="Categories"
          items={categories}
          onFetch={fetchCategories}
          onCreate={createCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
        />
      </div>
    </div>
  );
}

export default function AttributesPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <AttributesPageContent />
    </ProtectedRoute>
  );
}
