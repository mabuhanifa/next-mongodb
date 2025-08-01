"use client";

import ProtectedRoute from "@/components/ProtectedRoute.js";
import StatCard from "@/components/StatCard.js";
import {
  getProfitReport,
  getSalesReport,
  getSummaryReport,
} from "@/services/reportsApi.js";
import { useEffect, useState } from "react";

function ReportsPageContent() {
  const [summary, setSummary] = useState(null);
  const [salesReport, setSalesReport] = useState(null);
  const [profitReport, setProfitReport] = useState(null);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await getSummaryReport();
        setSummary(data.data);
      } catch (error) {
        console.error("Failed to fetch summary report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
  };

  const handleFetchReports = async () => {
    const params = {};
    if (dates.startDate) params.startDate = dates.startDate;
    if (dates.endDate) params.endDate = dates.endDate;

    try {
      const [salesRes, profitRes] = await Promise.all([
        getSalesReport(params),
        getProfitReport(params),
      ]);
      setSalesReport(salesRes.data.data);
      setProfitReport(profitRes.data.data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }
  };

  if (loading)
    return <div className="text-center p-10 text-black">Loading...</div>;

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>

      {/* Summary Report */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overall Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={summary?.totalRevenue || 0}
            isCurrency={true}
          />
          <StatCard
            title="Total Units Sold"
            value={summary?.totalUnitsSold || 0}
          />
          <StatCard
            title="Total Products"
            value={summary?.totalProducts || 0}
          />
          <StatCard
            title="Total Customers"
            value={summary?.totalCustomers || 0}
          />
        </div>
      </div>

      {/* Date-based Reports */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Filtered Reports</h2>
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={dates.startDate}
              onChange={handleDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={dates.endDate}
              onChange={handleDateChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
            />
          </div>
          <button
            onClick={handleFetchReports}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 self-end"
          >
            Generate Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Report */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Sales Report</h3>
            {salesReport ? (
              <div className="space-y-2">
                <p>
                  <strong>Total Revenue:</strong> $
                  {salesReport.totalRevenue.toFixed(2)}
                </p>
                <p>
                  <strong>Total Units Sold:</strong>{" "}
                  {salesReport.totalUnitsSold}
                </p>
                <p>
                  <strong>Number of Sales:</strong> {salesReport.numberOfSales}
                </p>
              </div>
            ) : (
              <p>Select a date range and generate a report.</p>
            )}
          </div>
          {/* Profit Report */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Profit Report</h3>
            {profitReport ? (
              <div className="space-y-2">
                <p>
                  <strong>Total Revenue:</strong> $
                  {profitReport.totalRevenue.toFixed(2)}
                </p>
                <p>
                  <strong>Total Cost:</strong> $
                  {profitReport.totalCost.toFixed(2)}
                </p>
                <p className="font-bold">
                  <strong>Total Profit:</strong> $
                  {profitReport.totalProfit.toFixed(2)}
                </p>
              </div>
            ) : (
              <p>Select a date range and generate a report.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <ReportsPageContent />
    </ProtectedRoute>
  );
}
