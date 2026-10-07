import { NextResponse } from "next/server";

import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { wishlistCode } = await params;

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

    const wishlist = await WishlistModel.findOne({
      code: wishlistCode,
      userId: user._id,
    });

    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: "لیست پیدا نشد",
        },
        { status: 404 },
      );
    }

    wishlist.title = title.trim();
    wishlist.description = description?.trim() || null;

    if (color_or_size !== undefined) {
      wishlist.color_or_size = color_or_size || null;
    }

    await wishlist.save();

    return NextResponse.json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.error("UPDATE WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ویرایش لیست",
      },
      { status: 500 },
    );
  }
}
