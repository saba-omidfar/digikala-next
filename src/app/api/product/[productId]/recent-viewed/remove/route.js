import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;
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
          message: "کاربر لاگین نیست",
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

    if (!Array.isArray(user.recent_viewed_products)) {
      user.recent_viewed_products = [];
    }

    const previousLength = user.recent_viewed_products.length;

    user.recent_viewed_products = user.recent_viewed_products.filter(
      (item) => Number(item.productId) !== numericProductId,
    );

    if (user.recent_viewed_products.length === previousLength) {
      return Response.json(
        {
          success: false,
          message: "محصول در بازدیدهای اخیر یافت نشد",
        },
        { status: 404 },
      );
    }

    await user.save();

    return Response.json({
      success: true,
      message: "محصول از بازدیدهای اخیر حذف شد",
    });
  } catch (error) {
    console.error("Remove recent viewed error:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
