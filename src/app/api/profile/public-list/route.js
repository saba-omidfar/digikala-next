import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import WishlistModel from "@/models/Wishlist";

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          status: 401,
          message: "کاربر وارد نشده است",
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
          status: 401,
          message: "کاربر پیدا نشد",
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = 10;
    const skip = (page - 1) * limit;

    const filter = {
      userId: user._id,
    };

    const [wishlists, totalItems] = await Promise.all([
      WishlistModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      WishlistModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    const publicList = wishlists.map((list) => {
      return {
        id: list._id,
        code: list.code,
        title: list.title,
        description: list.description || null,

        share_urls: {},

        size_list: Array.isArray(list.item_product)
          ? list.item_product.length
          : 0,

        product_images: list.product_images || [],
      };
    });

    return Response.json({
      status: 200,

      data: {
        public_list: publicList,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (err) {
    console.error("GET PUBLIC LIST ERROR:", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
