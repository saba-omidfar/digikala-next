import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import recalcCartPrices from "@/utils/recalcCartPrices";
import syncUserCart from "@/utils/syncUserCart";

export async function PATCH(req) {
  await dbConnect();

  const {
    guestCartId = null,
    productId,
    variantId,
    hasInsurance,
  } = await req.json();

  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  const dbUser = await UserModel.findOne({
    "auth.accessToken": accessToken,
  }).select("_id");

  let cart = null;

  if (dbUser) {
    cart = await CartModel.findOne({ userId: dbUser._id });
  } else if (guestCartId) {
    cart = await CartModel.findById(guestCartId);
  }

  if (!cart) return Response.json({ message: "سبد پیدا نشد" }, { status: 404 });

  const item = cart.packages[0].cart_items.find(
    (ci) =>
      Number(ci.product.id) === Number(productId) &&
      Number(ci.variant.id) === Number(variantId),
  );

  if (item) {
    item.has_insurance = Boolean(hasInsurance);

    cart.updatedAt = new Date();
    recalcCartPrices(cart);
    await cart.save();

    const user = await UserModel.findById(cart.userId);
    await syncUserCart(user, cart);

    await user.save();
  }

  return Response.json({ success: true, cart });
}
