import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { productId, send_sms, send_email, send_notification } =
      await req.json();

    const numericProductId = Number(productId);

    if (!Number.isFinite(numericProductId)) {
      return Response.json(
        {
          success: false,
          message: "شناسه محصول نامعتبر است",
        },
        { status: 400 },
      );
    }

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر احراز هویت نشده است",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user?.is_logged_in) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    const alreadyObserved = user.observed_products?.some(
      (item) => Number(item.productId) === numericProductId,
    );

    if (alreadyObserved) {
      return Response.json(
        {
          success: false,
          message: "قبلا ثبت شده است",
        },
        { status: 409 },
      );
    }

    user.observed_products.push({
      productId: numericProductId,
      type: "on_incredible_offer",
      send_sms: Boolean(send_sms),
      send_email: Boolean(send_email),
      send_notification: Boolean(send_notification),
    });

    await user.save();

    return Response.json({
      success: true,
      action: "add",
    });
  } catch (err) {
    console.error("Add observe error:", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
