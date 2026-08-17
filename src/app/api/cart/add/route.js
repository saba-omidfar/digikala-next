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

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    const {
      guestCartId = null,
      productId = null,
      variantId = null,
      quantity = 1,
      hasInsurance = false,
      fromNextCart = false,
      moveAll = false,
    } = await req.json();

    let cart;

    /* ---------------- USER / GUEST CART ---------------- */

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).select("_id");

    if (user) {
      cart = await CartModel.findOne({
        userId: user._id,
      });
    } else if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
      cart = await CartModel.findById(guestCartId);
    }

    if (!cart) {
      cart = await CartModel.create({
        userId: user?._id || null,
        packages: [{ cart_items: [] }],
        next_cart: [],
      });
    }

    const packageRef = cart.packages?.[0];

    let cartProduct = null;
    let cartVariant = null;

    /* ---------------- MOVE ALL: NEXT -> BASKET ---------------- */
    if (fromNextCart && moveAll) {
      for (const item of cart.next_cart) {
        const idx = packageRef.cart_items.findIndex(
          (ci) => Number(ci.variant?.id) === Number(item.variant?.id),
        );

        if (idx > -1) {
          packageRef.cart_items[idx].quantity += item.quantity;
        } else {
          packageRef.cart_items.push(item);
        }
      }

      cart.next_cart = [];
      cart.updatedAt = new Date();

      recalcCartPrices(cart);
      await cart.save();

      if (cart.userId) {
        const dbUser = await UserModel.findById(cart.userId);
        if (dbUser) {
          await syncUserCart(dbUser, cart);
          await dbUser.save();
        }
      }

      return Response.json({ success: true, cart }, { status: 200 });
    }

    /* ---------------- MOVE ALL: BASKET -> NEXT ---------------- */
    if (!fromNextCart && moveAll) {
      for (const item of packageRef.cart_items) {
        const idx = cart.next_cart.findIndex(
          (ci) => Number(ci.variant?.id) === Number(item.variant?.id),
        );

        if (idx > -1) {
          cart.next_cart[idx].quantity += item.quantity;
        } else {
          cart.next_cart.push(item);
        }
      }

      packageRef.cart_items = [];
      cart.updatedAt = new Date();

      recalcCartPrices(cart);
      await cart.save();

      if (cart.userId) {
        const dbUser = await UserModel.findById(cart.userId);
        if (dbUser) {
          await syncUserCart(dbUser, cart);
          await dbUser.save();
        }
      }

      return Response.json({ success: true, cart }, { status: 200 });
    }

    /* ---------------- SINGLE ITEM / FETCH PRODUCT ---------------- */
    if (fromNextCart) {
      const nextItem = cart.next_cart.find(
        (item) => Number(item.variant?.id) === Number(variantId),
      );

      if (!nextItem) {
        return Response.json(
          { success: false, message: "محصول در خرید بعدی پیدا نشد" },
          { status: 404 },
        );
      }

      cartProduct = nextItem.product;
      cartVariant = nextItem.variant;

      cart.next_cart = cart.next_cart.filter(
        (item) => Number(item.variant?.id) !== Number(variantId),
      );
    } else {
      const res = await fetch(
        `https://api.digikala.com/v2/product/${productId}/`,
      );

      const data = await res.json();
      const product = data?.data?.product;

      if (!product) {
        return Response.json(
          { success: false, message: "محصول پیدا نشد" },
          { status: 404 },
        );
      }

      const variant =
        product.variants?.find((v) => Number(v.id) === Number(variantId)) ||
        product.default_variant;

      if (!variant) {
        return Response.json(
          { success: false, message: "واریانت نامعتبر است" },
          { status: 400 },
        );
      }

      cartProduct = product;
      cartVariant = variant;
    }

    /* ---------------- REMOVE FROM NEXT CART ---------------- */
    cart.next_cart = cart.next_cart.filter(
      (item) => Number(item.variant?.id) !== Number(cartVariant.id),
    );

    /* ---------------- ADD / UPDATE CART ITEM ---------------- */
    const existingIndex = packageRef.cart_items.findIndex(
      (item) => Number(item.variant?.id) === Number(cartVariant.id),
    );

    if (existingIndex > -1) {
      const existingItem = packageRef.cart_items[existingIndex];

      if (
        existingItem.quantity + quantity >
        (cartVariant?.price?.order_limit || Infinity)
      ) {
        return Response.json(
          { success: false, message: "حداکثر تعداد مجاز رسیدی" },
          { status: 400 },
        );
      }

      existingItem.quantity += quantity;
      existingItem.has_insurance = Boolean(hasInsurance);
    } else {
      packageRef.cart_items.push({
        id: Math.floor(Math.random() * 1e9),
        cart_id: cart._id,
        quantity,
        product: { ...cartProduct },
        variant: { ...cartVariant },
        has_insurance: Boolean(hasInsurance),
      });
    }

    /* ---------------- SAVE ---------------- */
    cart.updatedAt = new Date();

    recalcCartPrices(cart);
    await cart.save();

    if (cart.userId) {
      const dbUser = await UserModel.findById(cart.userId);
      if (dbUser) {
        await syncUserCart(dbUser, cart);
        await dbUser.save();
      }
    }

    return Response.json(
      { success: true, cart, guestCartId: !user?.id ? cart._id : null },
      { status: 201 },
    );
  } catch (err) {
    console.error("Cart error:", err);

    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
