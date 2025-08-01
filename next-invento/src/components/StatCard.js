"use client";

export default function StatCard({ title, value, isCurrency = false }) {
  const formattedValue = isCurrency
    ? `$${Number(value).toFixed(2)}`
    : Number(value).toLocaleString();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-sm font-medium text-gray-500 truncate">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-gray-900">
        {formattedValue}
      </p>
    </div>
  );
}
