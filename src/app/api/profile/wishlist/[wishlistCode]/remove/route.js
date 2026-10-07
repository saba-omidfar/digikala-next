import { NextResponse } from "next/server";

import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { wishlistCode } = await params;

    console.log("wishlistCode in route:", wishlistCode);

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

    console.log("wishlist item =>", wishlist);

    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: "لیست پیدا نشد",
        },
        { status: 404 },
      );
    }

    await WishlistModel.deleteOne({
      _id: wishlist._id,
    });

    return NextResponse.json({
      success: true,
      message: "لیست با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("REMOVE WISHLIST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف لیست",
      },
      { status: 500 },
    );
  }
}
