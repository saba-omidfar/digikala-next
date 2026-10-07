import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    const { searchParams } = new URL(req.url);
    const guestCartId = searchParams.get("guestCartId");

    let cart = null;

    if (accessToken) {
      const user = await UserModel.findOne({
        "auth.accessToken": accessToken,
      });

      if (!user?.is_logged_in) {
        return Response.json(
          { success: false, message: "کاربر یافت نشد" },
          { status: 404 },
        );
      }

      cart = await CartModel.findOne({ userId: user._id });
    } else if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
      cart = await CartModel.findById(guestCartId);
    }

    if (!cart) {
      return Response.json(
        { success: false, message: "سبد خرید یافت نشد" },
        { status: 404 },
      );
    }

    cart.packages = cart.packages.map((pkg) => ({
      ...pkg,
      cart_items: pkg.cart_items.filter((item) => item.save_for_later === true),
    }));

    cart.updatedAt = new Date();
    await cart.save();

    return Response.json(
      {
        success: true,
        message: accessToken
          ? "سبد خرید کاربر پاک شد"
          : "سبد خرید مهمان پاک شد",
      },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
