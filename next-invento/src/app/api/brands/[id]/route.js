import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Brand from "@/app/models/Brand";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const brand = await Brand.findById(params.id);
    if (!brand) {
      return NextResponse.json(
        { success: false, error: "Brand not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: brand });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
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
    const brand = await Brand.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!brand) {
      return NextResponse.json(
        { success: false, error: "Brand not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: brand });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
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

    const deletedBrand = await Brand.deleteOne({ _id: params.id });
    if (deletedBrand.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Brand not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
