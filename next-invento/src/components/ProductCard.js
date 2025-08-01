"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product._id}`} className="block group">
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 bg-white text-black">
        {/* Placeholder for an image */}
        <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
          <span className="text-gray-500">Image</span>
        </div>
        <h3 className="text-lg font-semibold truncate group-hover:text-indigo-600">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm">
          {product.brand?.name || "No Brand"}
        </p>
        <p className="text-xl font-bold mt-2">${product.price}</p>
      </div>
    </Link>
  );
}
