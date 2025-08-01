"use client";

import ProtectedRoute from "@/components/ProtectedRoute.js";
import {
  addStock,
  getInventory,
  getLowStock,
} from "@/services/inventoryApi.js";
import { useEffect, useState } from "react";

function AddStockForm({ productId, onStockAdded }) {
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quantity || quantity <= 0) return;
    try {
      await addStock({ productId, quantity: Number(quantity) });
      setQuantity("");
      onStockAdded();
    } catch (error) {
      console.error("Failed to add stock:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Qty"
        className="w-20 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-black"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
}

function InventoryPageContent() {
  const [inventory, setInventory] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  const fetchAllData = async () => {
    try {
      const [inventoryRes, lowStockRes] = await Promise.all([
        getInventory(),
        getLowStock(20),
      ]);
      setInventory(inventoryRes.data.data);
      setLowStock(lowStockRes.data.data);
    } catch (error) {
      console.error("Failed to fetch inventory data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

      {lowStock.length > 0 && (
        <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="font-bold mb-2">Low Stock Alert!</h2>
          <p>The following items have low stock (less than 20):</p>
          <ul className="list-disc list-inside mt-2">
            {lowStock.map((item) => (
              <li key={item._id}>
                {item.name} (Stock: {item.stock})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">All Products Stock</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Current Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Add Stock
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">
                  <AddStockForm
                    productId={item._id}
                    onStockAdded={fetchAllData}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <InventoryPageContent />
    </ProtectedRoute>
  );
}
