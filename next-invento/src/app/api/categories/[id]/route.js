import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  return NextResponse.json({ message: `Get category ${params.id}` });
}

export async function PUT(request, { params }) {
  return NextResponse.json({ message: `Update category ${params.id}` });
}

export async function DELETE(request, { params }) {
  return NextResponse.json({ message: `Delete category ${params.id}` });
}
