import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";

import { cookies } from "next/headers";
import { nanoid } from "nanoid";

async function getAuthenticatedUser() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  if (!accessToken) {
    return {
      error: Response.json(
        {
          success: false,
          message: "کاربر احراز هویت نشده است",
        },
        { status: 401 },
      ),
    };
  }

  const user = await UserModel.findOne({
    "auth.accessToken": accessToken,
  });

  if (!user) {
    return {
      error: Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      ),
    };
  }

  return { user };
}

export async function POST(req) {
  try {
    await dbConnect();

    const { user, error } = await getAuthenticatedUser();

    if (error) {
      return error;
    }

    const body = await req.json();

    const { title, description = "", color_or_size = "" } = body;

    if (!title?.trim()) {
      return Response.json(
        {
          success: false,
          message: "عنوان لیست الزامی است.",
        },
        { status: 400 },
      );
    }

    const code = nanoid(8);

    const newWishlist = await WishlistModel.create({
      userId: user._id,
      title: title.trim(),
      description,
      color_or_size,
      code,
      item_product: [],
      product_images: [],
      product_on_list: false,
      size: 0,
    });

    return Response.json(
      {
        success: true,
        message: "لیست با موفقیت ساخته شد.",
        data: newWishlist,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("create wishlist error =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();

    const { user, error } = await getAuthenticatedUser();

    if (error) {
      return error;
    }

    const body = await req.json();
    const wishlistId = String(body?.wishlistId || "").trim();

    if (!wishlistId) {
      return Response.json(
        {
          success: false,
          message: "شناسه لیست الزامی است.",
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
          message: "لیست یافت نشد.",
        },
        { status: 404 },
      );
    }

    await WishlistModel.findByIdAndDelete(wishlistId);

    return Response.json(
      {
        success: true,
        message: "لیست با موفقیت حذف شد.",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("delete wishlist error =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const { user, error } = await getAuthenticatedUser();

    if (error) {
      return error;
    }

    const body = await req.json();

    const wishlistId = String(body?.wishlistId || "").trim();

    if (!wishlistId) {
      return Response.json(
        {
          success: false,
          message: "شناسه لیست الزامی است.",
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
          message: "لیست یافت نشد.",
        },
        { status: 404 },
      );
    }

    if (body.title !== undefined) {
      const title = String(body.title).trim();

      if (!title) {
        return Response.json(
          {
            success: false,
            message: "عنوان لیست نمی‌تواند خالی باشد.",
          },
          { status: 400 },
        );
      }

      wishlist.title = title;
    }

    if (body.description !== undefined) {
      wishlist.description = body.description;
    }

    if (body.color_or_size !== undefined) {
      wishlist.color_or_size = body.color_or_size;
    }

    await wishlist.save();

    return Response.json(
      {
        success: true,
        message: "لیست با موفقیت ویرایش شد.",
        data: wishlist,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("update wishlist error =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
