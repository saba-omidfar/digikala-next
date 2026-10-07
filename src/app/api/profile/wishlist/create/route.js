import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const { title, description, color_or_size } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "عنوان لیست الزامی است",
        },
        { status: 400 },
      );
    }

    const accessToken = req.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user?.is_logged_in) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 401 },
      );
    }

    const code = nanoid(8);

    const wishlist = await WishlistModel.create({
      userId: user._id,
      title: title.trim(),
      description: description?.trim() || "",
      color_or_size: color_or_size || "",
      code,
      item_product: [],
      product_images: [],
      product_on_list: false,
      size: 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "لیست با موفقیت ساخته شد.",
        data: wishlist,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "خطا در ساخت لیست",
      },
      { status: 500 },
    );
  }
}
