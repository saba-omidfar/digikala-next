import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import recalcCartPrices from "@/utils/recalcCartPrices";
import syncUserCart from "@/utils/syncUserCart";

export async function PATCH(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const {
      userId = null,
      guestCartId = null,
      variantId = null,
      moveAll = false,
      toNext = false,
    } = body;

    let cart;
    if (userId) cart = await CartModel.findOne({ userId });
    else if (guestCartId) cart = await CartModel.findById(guestCartId);

    if (!cart)
      return Response.json(
        { success: false, message: "سبد خرید یافت نشد" },
        { status: 404 },
      );

    const allItems = cart.packages.flatMap((pkg) => pkg.cart_items || []);

    if (moveAll) {
      allItems.forEach((item) => {
        if (toNext) {
          if (!item.save_for_later) item.save_for_later = true;
        } else {
          if (item.save_for_later) item.save_for_later = false;
        }
      });
    } else if (variantId) {
      const item = allItems.find(
        (i) => Number(i.variant?.id) === Number(variantId),
      );

      if (item) item.save_for_later = !item.save_for_later;
    }

    cart.updatedAt = new Date();
    recalcCartPrices(cart);
    await cart.save();

    const user = await UserModel.findById(cart.userId);

    await syncUserCart(user, cart);

    await user.save();

    return Response.json({ success: true, cart }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
