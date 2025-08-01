import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Customer from "@/app/models/Customer";
import Product from "@/app/models/Product";
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

    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Customer.countDocuments();

    const salesData = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
          totalUnitsSold: { $sum: "$quantity" },
        },
      },
    ]);

    const summary = {
      totalProducts,
      totalCustomers,
      totalRevenue: salesData[0]?.totalRevenue || 0,
      totalUnitsSold: salesData[0]?.totalUnitsSold || 0,
    };

    return NextResponse.json({ success: true, data: summary });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
