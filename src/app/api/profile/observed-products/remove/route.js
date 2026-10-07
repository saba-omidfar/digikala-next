import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { productId } = await req.json();

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

    const previousLength = user.observed_products?.length || 0;

    user.observed_products = (user.observed_products || []).filter(
      (item) => Number(item.productId) !== numericProductId,
    );

    if (user.observed_products.length === previousLength) {
      return Response.json(
        {
          success: false,
          message: "اعلان این محصول یافت نشد",
        },
        { status: 404 },
      );
    }

    await user.save();

    return Response.json({
      success: true,
      action: "remove",
    });
  } catch (err) {
    console.error("Remove observe error:", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
