import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import CommentModel from "@/models/Comment";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const body = await req.json();

    const {
      comment_id,
      comment,
      is_anonymous = false,
      rating = 0,
      purchased_item,
    } = body;

    if (!comment_id) {
      return Response.json(
        {
          success: false,
          message: "شناسه دیدگاه الزامی است.",
        },
        { status: 400 },
      );
    }

    if (!comment?.trim()) {
      return Response.json(
        {
          success: false,
          message: "متن دیدگاه الزامی است.",
        },
        { status: 400 },
      );
    }

    if (comment.trim().length < 3) {
      return Response.json(
        {
          success: false,
          message: "متن دیدگاه کوتاه است.",
        },
        { status: 400 },
      );
    }

    if (rating < 0 || rating > 5) {
      return Response.json(
        {
          success: false,
          message: "امتیاز نامعتبر است.",
        },
        { status: 400 },
      );
    }

    if (!productId) {
      return Response.json(
        {
          success: false,
          message: "محصول پیدا نشد.",
        },
        { status: 404 },
      );
    }

    const cookiesStore = await cookies();

    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
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
          message: "User not found",
        },
        { status: 401 },
      );
    }

    const existingComment = await CommentModel.findOne({
      id: Number(comment_id),
      user_id: user._id,
      product_id: Number(productId),
    });

    if (!existingComment) {
      return Response.json(
        {
          success: false,
          message: "دیدگاه پیدا نشد.",
        },
        { status: 404 },
      );
    }

    existingComment.body = comment.trim();
    existingComment.is_anonymous = is_anonymous;
    existingComment.rate = rating;

    if (purchased_item !== undefined) {
      existingComment.purchased_item = purchased_item;
    }

    existingComment.status = "pending";

    await existingComment.save();

    return Response.json({
      success: true,
      message: "دیدگاه با موفقیت ویرایش شد.",
      data: existingComment,
    });
  } catch (err) {
    console.error("UPDATE COMMENT ERROR =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
