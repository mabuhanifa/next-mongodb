import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Brand from "@/app/models/Brand";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const brands = await Brand.find({});
    return NextResponse.json({ success: true, data: brands });
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
    const brand = await Brand.create(body);
    return NextResponse.json({ success: true, data: brand }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
