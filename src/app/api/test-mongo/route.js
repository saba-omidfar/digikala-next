import mongoose from "mongoose";
import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";

export async function GET() {
  try {
    await dbConnect();

    const cartCount = await CartModel.countDocuments();

    return Response.json({
      success: true,
      readyState: mongoose.connection.readyState,
      cartCount,
      modelName: CartModel.modelName,
      collectionName: CartModel.collection.name,
    });
  } catch (error) {
    console.error("❌ TEST CART ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
        readyState: mongoose.connection.readyState,
      },
      { status: 500 },
    );
  }
}
