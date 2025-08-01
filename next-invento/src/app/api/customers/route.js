import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Customer from "@/app/models/Customer";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const customers = await Customer.find({});
    return NextResponse.json({ success: true, data: customers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const customer = await Customer.create(body);
    return NextResponse.json(
      { success: true, data: customer },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
