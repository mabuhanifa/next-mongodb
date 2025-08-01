import dbConnect from "@/app/lib/dbConnect";
import "@/app/models/Customer"; // Import for side-effects
import "@/app/models/Product"; // Import for side-effects
import Sale from "@/app/models/Sale";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const sale = await Sale.findById(params.id)
      .populate("product")
      .populate("customer");
    if (!sale) {
      return NextResponse.json(
        { success: false, error: "Sale not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: sale });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      {
        status: 500,
      }
    );
  }
}
