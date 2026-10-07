import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { productId } = await req.json();

    if (!productId) {
      return Response.json(
        {
          success: false,
          message: "شناسه محصول الزامی است",
        },
        {
          status: 400,
        },
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
        {
          status: 401,
        },
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
        {
          status: 404,
        },
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $addToSet: {
          favorite_products: String(productId),
        },
      },
      {
        new: true,
      },
    );

    return Response.json(
      {
        success: true,
        message: "محصول به لیست علاقه‌مندی‌ها اضافه شد",
        favorites: updatedUser?.favorite_products || [],
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error("add favorite error =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
