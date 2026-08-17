import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

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

    if (!user?._id) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    const favoriteId = String(productId);

    if (!Array.isArray(user.favorite_products)) {
      user.favorite_products = [];
    }

    if (!user.favorite_products.includes(favoriteId)) {
      user.favorite_products.push(favoriteId);
      await user.save();
    }

    return Response.json(
      {
        success: true,
        message: "محصول به علاقه‌مندی‌ها اضافه شد",
        favorites: user.favorite_products,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("add favorite error =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
