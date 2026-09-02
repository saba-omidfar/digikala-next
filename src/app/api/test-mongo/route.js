import mongoose from "mongoose";
import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";

export async function GET() {
  try {
    await dbConnect();

    const dbName = mongoose.connection.db.databaseName;

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    const cartCount = await CartModel.countDocuments();

    return Response.json({
      success: true,
      readyState: mongoose.connection.readyState,
      dbName,
      modelName: CartModel.modelName,
      collectionName: CartModel.collection.name,
      cartCount,
      collections: collections.map((c) => c.name),
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
