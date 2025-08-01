import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Customer from "@/app/models/Customer";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const customer = await Customer.findById(params.id);
    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: customer });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
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
    const customer = await Customer.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: customer });
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

    const deletedCustomer = await Customer.deleteOne({ _id: params.id });
    if (deletedCustomer.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
