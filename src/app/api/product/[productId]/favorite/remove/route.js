import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "کاربر احراز هویت نشده است" },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({ "auth.token": token });
    if (!user?._id) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    if (!Array.isArray(user.favorite_products)) {
      user.favorite_products = [];
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { "auth.token": token },
      {
        $pull: {
          favorite_products: productId,
        },
      },
      {
        new: true,
      },
    );

    return Response.json(
      {
        success: true,
        message: "محصول از لیست علاقه‌مندی‌ها حذف شد",
        favorites: updatedUser.favorite_products,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("remove favorite error =>", err);

    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
