import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";

import { cookies } from "next/headers";

export async function PUT(req) {
  try {
    await dbConnect();

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

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    const body = await req.json();

    const wishlistId = String(body?.wishlistId || "").trim();
    const productId = Number(body?.productId);

    if (!wishlistId || !Number.isFinite(productId)) {
      return Response.json(
        {
          success: false,
          message: "شناسه لیست و محصول الزامی است",
        },
        { status: 400 },
      );
    }

    const wishlist = await WishlistModel.findOne({
      _id: wishlistId,
      userId: user._id,
    });

    if (!wishlist) {
      return Response.json(
        {
          success: false,
          message: "لیست یافت نشد",
        },
        { status: 404 },
      );
    }

    if (!Array.isArray(wishlist.item_product)) {
      wishlist.item_product = [];
    }

    const alreadyExists = wishlist.item_product.some(
      (item) => Number(item?.productId) === productId,
    );

    if (alreadyExists) {
      return Response.json(
        {
          success: true,
          message: "محصول قبلاً به این لیست اضافه شده است",
          data: wishlist,
        },
        { status: 200 },
      );
    }

    wishlist.item_product.push({
      productId,
      addedAt: new Date(),
    });

    wishlist.product_on_list = true;

    await wishlist.save();

    return Response.json(
      {
        success: true,
        message: "محصول با موفقیت به لیست اضافه شد",
        data: wishlist,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("add product to wishlist error =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
