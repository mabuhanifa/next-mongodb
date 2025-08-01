import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Product from "@/app/models/Product";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);

  const filters = {};
  if (searchParams.get("brand")) filters.brand = searchParams.get("brand");
  if (searchParams.get("category"))
    filters.category = searchParams.get("category");
  if (searchParams.get("color"))
    filters["attributes.color"] = searchParams.get("color");
  if (searchParams.get("size"))
    filters["attributes.size"] = searchParams.get("size");
  if (searchParams.get("type"))
    filters["attributes.type"] = searchParams.get("type");
  if (searchParams.get("tags"))
    filters.tags = { $in: searchParams.get("tags").split(",") };

  try {
    const products = await Product.find(filters)
      .populate("brand")
      .populate("category");
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

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

    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
