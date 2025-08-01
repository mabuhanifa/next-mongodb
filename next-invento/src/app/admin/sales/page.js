"use client";

import ProtectedRoute from "@/components/ProtectedRoute.js";
import { getSales } from "@/services/salesApi.js";
import Link from "next/link";
import { useEffect, useState } from "react";

function SalesPageContent() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await getSales();
        setSales(data.data);
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sales History</h1>
        <Link
          href="/admin/sales/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Record New Sale
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td className="px-6 py-4">{sale.product?.name || "N/A"}</td>
                <td className="px-6 py-4">{sale.quantity}</td>
                <td className="px-6 py-4">${sale.totalPrice.toFixed(2)}</td>
                <td className="px-6 py-4">{sale.customer?.name || "N/A"}</td>
                <td className="px-6 py-4">
                  {new Date(sale.saleDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SalesPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <SalesPageContent />
    </ProtectedRoute>
  );
}
