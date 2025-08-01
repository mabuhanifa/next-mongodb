import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ message: "Get all brands" });
}

export async function POST(request) {
  return NextResponse.json({ message: "Create brand" });
}
