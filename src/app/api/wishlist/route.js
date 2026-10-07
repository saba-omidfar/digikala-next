import dbConnect from "@/configs/db";

import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";

import { cookies } from "next/headers";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر لاگین نیست",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).lean();

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
    const { title, description, color_or_size } = body;

    if (!user?.is_logged_in || !title) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "userId و title الزامی هستند.",
        }),
        { status: 400 },
      );
    }

    const code = nanoid(8);

    const newWishlist = await WishlistModel.create({
      userId: user?._id,
      title,
      description: description || "",
      color_or_size: color_or_size || "",
      code,
      item_product: [],
      product_images: [],
      product_on_list: false,
      size: 0,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "لیست با موفقیت ساخته شد.",
        data: newWishlist,
      }),
      { status: 201 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { wishlistId } = body;

    if (!wishlistId) {
      return new Response(
        JSON.stringify({ success: false, message: "شناسه لیست الزامی است." }),
        { status: 400 },
      );
    }

    await WishlistModel.findByIdAndDelete(wishlistId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "لیست با موفقیت حذف شد.",
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { wishlistId, title, description, color_or_size } = body;

    if (!wishlistId) {
      return new Response(
        JSON.stringify({ success: false, message: "شناسه لیست الزامی است." }),
        { status: 400 },
      );
    }

    const updatedList = await WishlistModel.findByIdAndUpdate(
      wishlistId,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(color_or_size && { color_or_size }),
      },
      { new: true },
    );

    if (!updatedList) {
      return new Response(
        JSON.stringify({ success: false, message: "لیست یافت نشد." }),
        { status: 404 },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "لیست با موفقیت ویرایش شد.",
        data: updatedList,
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, message: err.message }),
      { status: 500 },
    );
  }
}
