import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Sale from "@/app/models/Sale";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const userId = getDataFromToken(request);
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const filter =
      Object.keys(dateFilter).length > 0 ? { saleDate: dateFilter } : {};

    const salesReport = await Sale.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalUnitsSold: { $sum: "$quantity" },
          numberOfSales: { $sum: 1 },
        },
      },
    ]);

    const report = salesReport[0] || {
      totalRevenue: 0,
      totalUnitsSold: 0,
      numberOfSales: 0,
    };

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
