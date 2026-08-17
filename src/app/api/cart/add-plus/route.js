import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import CartModel from "@/models/Cart";

import syncUserCart from "@/utils/syncUserCart";

export async function POST(req) {
  try {
    {
      await dbConnect();

      const { plan } = await req.json();

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

      const tax = plan.price * 0.1;

      const rrp = plan.price + tax;
      const payable = plan.total_payable_price + tax;

      cart.temporary_plus_subscription = {
        title: plan.title,
        rrp_price: rrp,
        payable_price: payable,
        discount: plan.price - plan.total_payable_price,
      };

      await cart.save();

      user = await UserModel.findById(cart.userId);
      await syncUserCart(user, cart);

      await user.save();

      return Response.json({
        success: true,
        subscription: cart.temporary_plus_subscription,
      });
    }
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
