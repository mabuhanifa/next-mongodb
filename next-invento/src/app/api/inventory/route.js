import dbConnect from "@/app/lib/dbConnect";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const inventory = await Product.find({}).select("name stock");
    return NextResponse.json({ success: true, data: inventory });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
