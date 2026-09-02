import mongoose from "mongoose";
import dbConnect from "@/configs/db";

export async function GET() {
  try {
    await dbConnect();

    await mongoose.connection.db.admin().ping();

    return Response.json({
      success: true,
      message: "MongoDB connected successfully",
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    console.error("❌ TEST MONGO ERROR:", error);

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
