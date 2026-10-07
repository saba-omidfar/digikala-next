import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

const MAX_ITEMS = 10;
const EXPIRE_DAYS = 5;

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

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - EXPIRE_DAYS);

    user.recent_viewed_products = user.recent_viewed_products.filter(
      (item) => new Date(item.viewedAt) > expireDate,
    );

    user.recent_viewed_products = user.recent_viewed_products.filter(
      (item) => Number(item.productId) !== numericProductId,
    );

    user.recent_viewed_products.push({
      productId: numericProductId,
      viewedAt: new Date(),
    });

    user.recent_viewed_products = user.recent_viewed_products.slice(-MAX_ITEMS);

    await user.save();

    return Response.json({
      success: true,
      message: "محصول به بازدیدهای اخیر اضافه شد",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
