import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Get inventory status" });
}
