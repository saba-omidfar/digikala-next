import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import CommentModel from "@/models/Comment";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

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

    const body = await req.json();

    const { comment_id } = body;

    if (!comment_id) {
      return Response.json(
        {
          success: false,
          message: "شناسه دیدگاه الزامی است.",
        },
        { status: 400 },
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

    await CommentModel.deleteOne({
      _id: existingComment._id,
    });

    return Response.json({
      success: true,
      message: "دیدگاه با موفقیت حذف شد.",
    });
  } catch (err) {
    console.error("REMOVE COMMENT ERROR =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
