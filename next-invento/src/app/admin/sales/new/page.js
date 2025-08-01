"use client";

import ProtectedRoute from "@/components/ProtectedRoute.js";
import { getCustomers } from "@/services/customerApi.js";
import { getProducts } from "@/services/productApi.js";
import { createSale } from "@/services/salesApi.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NewSalePageContent() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [saleData, setSaleData] = useState({
    productId: "",
    quantity: 1,
    customerId: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, customersRes] = await Promise.all([
          getProducts(),
          getCustomers(),
        ]);
        setProducts(productsRes.data.data);
        setCustomers(customersRes.data.data);
      } catch (err) {
        console.error("Failed to fetch data for sale form", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createSale(saleData);
      router.push("/admin/sales");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to record sale. Check stock levels."
      );
    }
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Record New Sale</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <div>
          <label
            htmlFor="productId"
            className="block text-sm font-medium text-gray-700"
          >
            Product
          </label>
          <select
            name="productId"
            id="productId"
            value={saleData.productId}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            <option value="">Select a Product</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} (Stock: {p.stock})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min="1"
            value={saleData.quantity}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>
        <div>
          <label
            htmlFor="customerId"
            className="block text-sm font-medium text-gray-700"
          >
            Customer (Optional)
          </label>
          <select
            name="customerId"
            id="customerId"
            value={saleData.customerId}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          >
            <option value="">Select a Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Record Sale
          </button>
        </div>
      </form>
    </div>
  );
}

export default function NewSalePage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <NewSalePageContent />
    </ProtectedRoute>
  );
}
