import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import CartModel from "@/models/Cart";

import syncUserCart from "@/utils/syncUserCart";

export async function DELETE(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    let user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).select("_id");

    const cart = await CartModel.findOne({ userId: user._id });

    if (!cart) {
      return Response.json(
        { success: false, message: "کارت پیدا نشد" },
        { status: 404 },
      );
    }

    // حذف پلن
    cart.temporary_plus_subscription = null;

    await cart.save();

    user = await UserModel.findById(cart.userId);

    if (user) {
      await syncUserCart(user, cart);
      await user.save();
    }

    return Response.json({
      success: true,
      message: "اشتراک پلاس حذف شد",
      cart,
    });
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
