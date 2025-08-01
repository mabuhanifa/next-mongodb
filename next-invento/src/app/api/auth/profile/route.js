import { NextResponse } from "next/server";

export async function GET(request) {
  // User profile logic will be implemented here
  return NextResponse.json({ message: "User profile endpoint" });
}
