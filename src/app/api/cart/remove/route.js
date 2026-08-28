import { cookies } from "next/headers";
import dbConnect from "@/configs/db";

import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import recalcCartPrices from "@/utils/recalcCartPrices";
import syncUserCart from "@/utils/syncUserCart";

import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      variantId,
      quantity = 1,
      removeFromNextPurchase = false,
      guestCartId = null,
    } = body;

    if (!variantId) {
      return Response.json(
        { success: false, message: "variantId الزامی است" },
        { status: 400 },
      );
    }

    /* --------------------------------
       1️⃣ تشخیص User یا Guest
    -------------------------------- */
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    let cart = null;

    if (accessToken) {
      const user = await UserModel.findOne({
        "auth.accessToken": accessToken,
      }).select("_id");

      if (!user) {
        return Response.json(
          { success: false, message: "کاربر یافت نشد" },
          { status: 404 },
        );
      }

      cart = await CartModel.findOne({ userId: user._id });
    } else if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
      cart = await CartModel.findById(guestCartId);
      console.log("CART =>", cart);
    }

    if (!cart) {
      return Response.json(
        { success: false, message: "سبد خرید یافت نشد" },
        { status: 404 },
      );
    }

    /* --------------------------------
       2️⃣ پیدا کردن آیتم
    -------------------------------- */
    const package0 = cart.packages?.[0];
    if (!package0) {
      return Response.json(
        { success: false, message: "سبد خرید خالی است" },
        { status: 404 },
      );
    }

    const itemIndex = package0.cart_items.findIndex(
      (item) => Number(item.variant?.id) === Number(variantId),
    );

    if (itemIndex === -1) {
      return Response.json(
        { success: false, message: "محصول در سبد یافت نشد" },
        { status: 404 },
      );
    }

    const cartItem = package0.cart_items[itemIndex];

    /* --------------------------------c
       3️⃣ منطق حذف / کاهش تعداد
    -------------------------------- */
    if (removeFromNextPurchase) {
      // حذف کامل (SaveForLater یا حذف مستقیم)
      package0.cart_items.splice(itemIndex, 1);
    } else {
      if (cartItem.quantity > 1 && quantity === 1) {
        cartItem.quantity -= 1;
      } else {
        package0.cart_items.splice(itemIndex, 1);
      }
    }

    /* --------------------------------
       4️⃣ ذخیره و محاسبه مجدد
    -------------------------------- */
    cart.updatedAt = new Date();
    recalcCartPrices(cart);
    await cart.save();

    if (cart.userId) {
      const user = await UserModel.findById(cart.userId);

      if (user) {
        syncUserCart(user, cart);
        await user.save();
      }
    }

    return Response.json(
      {
        success: true,
        cart,
        guestCartId: accessToken ? null : cart._id.toString(),
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Remove cart item error:", err);

    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
