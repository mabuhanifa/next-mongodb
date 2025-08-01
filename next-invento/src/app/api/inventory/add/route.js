import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Product from "@/app/models/Product";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
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

    const { productId, quantity } = await request.json();

    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Product ID and a positive quantity are required.",
        },
        { status: 400 }
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { stock: quantity } },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
