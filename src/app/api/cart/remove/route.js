import mongoose from "mongoose";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import recalcCartPrices from "@/utils/recalcCartPrices";
import hydrateItems from "@/utils/hydrateCartItems";
import syncUserCart from "@/utils/syncUserCart";

const syncCartWithUser = async (cart) => {
  if (!cart.userId) return;

  const user = await UserModel.findById(cart.userId);

  if (!user?.is_logged_in) return;

  await syncUserCart(user, cart);
  await user.save();
};

const saveCart = async (cart) => {
  cart.updatedAt = new Date();

  await cart.save();

  await syncCartWithUser(cart);
};

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

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

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

    if (removeFromNextPurchase) {
      package0.cart_items.splice(itemIndex, 1);
    } else {
      if (cartItem.quantity > 1 && quantity === 1) {
        cartItem.quantity -= 1;
      } else {
        package0.cart_items.splice(itemIndex, 1);
      }
    }

    const responseCart = cart.toObject();

    const hydratedItems = await hydrateItems(
      responseCart.packages?.[0]?.cart_items || [],
    );

    responseCart.packages[0].cart_items = hydratedItems;

    recalcCartPrices(responseCart);

    cart.items_count = responseCart.items_count;
    cart.payable_price = responseCart.payable_price;
    cart.rrp_price = responseCart.rrp_price;
    cart.rrp_price_total = responseCart.rrp_price_total;
    cart.items_discount = responseCart.items_discount;
    cart.total_discount = responseCart.total_discount;
    cart.insurance = responseCart.insurance;

    await saveCart(cart);

    return Response.json(
      {
        success: true,
        cart: responseCart,
        guestCartId: accessToken ? null : cart._id.toString(),
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
