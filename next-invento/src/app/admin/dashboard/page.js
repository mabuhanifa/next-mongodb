"use client";

import ProtectedRoute from "@/components/ProtectedRoute.js";
import Link from "next/link";

function DashboardPageContent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Products
          </h2>
          <p className="text-gray-600 mt-2">
            View, create, edit, and delete products.
          </p>
        </Link>
        <Link
          href="/admin/attributes"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Attributes
          </h2>
          <p className="text-gray-600 mt-2">
            Manage product brands and categories.
          </p>
        </Link>
        <Link
          href="/admin/sales"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800">Sales History</h2>
          <p className="text-gray-600 mt-2">View and record new sales.</p>
        </Link>
        <Link
          href="/admin/inventory"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800">Inventory</h2>
          <p className="text-gray-600 mt-2">
            Monitor stock levels and add new stock.
          </p>
        </Link>
        <Link
          href="/admin/customers"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            Manage Customers
          </h2>
          <p className="text-gray-600 mt-2">
            View, create, and edit customer information.
          </p>
        </Link>
        <Link
          href="/admin/reports"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
          <p className="text-gray-600 mt-2">
            View sales, profit, and summary reports.
          </p>
        </Link>
        {/* Add links to other admin sections here */}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <DashboardPageContent />
    </ProtectedRoute>
  );
}
