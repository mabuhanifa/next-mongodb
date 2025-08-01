import dbConnect from "@/app/lib/dbConnect";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const colors = await Product.distinct("attributes.color");
    const sizes = await Product.distinct("attributes.size");
    const types = await Product.distinct("attributes.type");

    return NextResponse.json({
      success: true,
      data: {
        colors: colors.filter((c) => c),
        sizes: sizes.filter((s) => s),
        types: types.filter((t) => t),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
