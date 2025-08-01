import dbConnect from "@/app/lib/dbConnect";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const threshold = parseInt(searchParams.get("threshold"), 10) || 10;

  try {
    const lowStockProducts = await Product.find({
      stock: { $lt: threshold },
    });
    return NextResponse.json({ success: true, data: lowStockProducts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
