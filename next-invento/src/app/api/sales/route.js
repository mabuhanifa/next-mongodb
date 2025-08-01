import { getDataFromToken } from "@/app/lib/auth-helpers";
import dbConnect from "@/app/lib/dbConnect";
import Product from "@/app/models/Product";
import Sale from "@/app/models/Sale";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const sales = await Sale.find({}).populate("product").populate("customer");
    return NextResponse.json({ success: true, data: sales });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity, customerId } = await request.json();

    if (!productId || !quantity || quantity <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Product ID and a positive quantity are required.",
        },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    product.stock -= quantity;
    await product.save({ session });

    const totalPrice = product.price * quantity;
    const totalCost = product.cost * quantity;

    const sale = new Sale({
      product: productId,
      customer: customerId, // Can be null
      quantity,
      totalPrice,
      totalCost,
    });
    const newSale = await sale.save({ session });

    await session.commitTransaction();

    const populatedSale = await Sale.findById(newSale._id)
      .populate("product")
      .populate("customer");

    return NextResponse.json(
      { success: true, data: populatedSale },
      { status: 201 }
    );
  } catch (error) {
    await session.abortTransaction();
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  } finally {
    session.endSession();
  }
}
