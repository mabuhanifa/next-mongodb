"use client";

import { getBrands } from "@/services/brandApi.js";
import { getCategories } from "@/services/categoryApi.js";
import { getProductAttributes } from "@/services/productApi.js";
import { useEffect, useState } from "react";

export default function FilterSidebar({ onFilterChange }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState({
    colors: [],
    sizes: [],
    types: [],
  });

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [brandsRes, categoriesRes, attributesRes] = await Promise.all([
          getBrands(),
          getCategories(),
          getProductAttributes(),
        ]);
        setBrands(brandsRes.data.data);
        setCategories(categoriesRes.data.data);
        setAttributes(attributesRes.data.data);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <aside className="w-64 p-4 border-r bg-gray-50 text-black">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            onChange={handleSelectChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleSelectChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Add more filters for color, size, type as needed */}
      </div>
    </aside>
  );
}
