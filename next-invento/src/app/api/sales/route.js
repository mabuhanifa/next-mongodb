import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Get all sales" });
}

export async function POST(request) {
  return NextResponse.json({ message: "Create sale" });
}
