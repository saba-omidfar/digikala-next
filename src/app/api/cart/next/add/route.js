import mongoose from "mongoose";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import recalcCartPrices from "@/utils/recalcCartPrices";
import syncUserCart from "@/utils/syncUserCart";

export async function POST(req) {
  try {
    await dbConnect();

    const { guestCartId = null, variantId, moveAll = false } = await req.json();

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
          success: false,
          message: "سبد خرید یافت نشد",
        },
        { status: 404 },
      );
    }

    const items = cart.packages?.[0]?.cart_items || [];

    if (moveAll) {
      for (const item of items) {
        const exists = cart.next_cart.some(
          (nextItem) =>
            Number(nextItem.variant?.id) === Number(item.variant?.id),
        );

        if (!exists) {
          cart.next_cart.push(item);
        }
      }

      cart.packages[0].cart_items = [];
    } else {
      const index = items.findIndex(
        (item) => Number(item.variant?.id) === Number(variantId),
      );

      if (index === -1) {
        return Response.json(
          {
            success: false,
            message: "محصول پیدا نشد",
          },
          { status: 404 },
        );
      }

      const item = items[index];

      const exists = cart.next_cart.some(
        (nextItem) => Number(nextItem.variant?.id) === Number(item.variant?.id),
      );

      if (!exists) {
        cart.next_cart.push(item);
      }

      cart.packages[0].cart_items.splice(index, 1);
    }

    recalcCartPrices(cart);
    await cart.save();

    if (cart.userId) {
      const user = await UserModel.findById(cart.userId);

      if (user) {
        await syncUserCart(user, cart);
        await user.save();
      }
    }

    return Response.json(
      {
        success: true,
        next_cart: cart.next_cart,
        guestCartId: !cart.userId ? cart._id : null,
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
