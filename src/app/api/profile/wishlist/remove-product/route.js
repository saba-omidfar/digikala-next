import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

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

    const productIndex = (wishlist.item_product || []).findIndex(
      (item) => Number(item?.productId) === productId,
    );

    if (productIndex === -1) {
      return Response.json(
        {
          success: false,
          message: "محصول در این لیست وجود ندارد",
        },
        { status: 404 },
      );
    }

    wishlist.item_product.splice(productIndex, 1);

    if (wishlist.product_images?.length > productIndex) {
      wishlist.product_images.splice(productIndex, 1);
    }

    wishlist.product_on_list = wishlist.item_product.length > 0;
    wishlist.size = wishlist.item_product.length;

    await wishlist.save();

    return Response.json({
      success: true,
      message: "محصول از لیست حذف شد",
      data: wishlist,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message || "خطا در حذف محصول از لیست",
      },
      { status: 500 },
    );
  }
}
