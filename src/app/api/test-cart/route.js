import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    const carts = await CartModel.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return Response.json({
      success: true,
      count: carts.length,
      carts,
    });
  } catch (error) {
    console.error("❌ TEST CART ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
