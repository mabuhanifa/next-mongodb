import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  return NextResponse.json({ message: `Get product ${params.id}` });
}

export async function PUT(request, { params }) {
  return NextResponse.json({ message: `Update product ${params.id}` });
}

export async function DELETE(request, { params }) {
  return NextResponse.json({ message: `Delete product ${params.id}` });
}
