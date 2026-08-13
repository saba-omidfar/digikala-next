import mongoose from "mongoose";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const guestCartId = searchParams.get("guestCartId");

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let cart = null;

    if (token) {
      const user = await UserModel.findOne({
        "auth.token": token,
      }).select("_id");

      if (!user) {
        return Response.json(
          {
            success: false,
            message: "کاربر یافت نشد",
          },
          { status: 404 },
        );
      }

      cart = await CartModel.findOne({
        userId: user._id,
      });
    } else if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
      cart = await CartModel.findById(guestCartId);
    }

    if (!cart) {
      return Response.json(
        {
          success: true,
          next_cart: [],
        },
        { status: 200 },
      );
    }

    return Response.json(
      {
        success: true,
        next_cart: cart.next_cart || [],
      },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
