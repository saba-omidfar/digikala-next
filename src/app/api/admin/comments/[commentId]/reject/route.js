import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import CommentModel from "@/models/Comment";

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { commentId } = await params;

    if (!commentId) {
      return Response.json(
        {
          success: false,
          message: "شناسه دیدگاه الزامی است.",
        },
        { status: 400 },
      );
    }

    const cookiesStore = await cookies();

    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "دسترسی غیرمجاز.",
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
          message: "کاربر پیدا نشد.",
        },
        { status: 401 },
      );
    }

    const comment = await CommentModel.findOne({
      id: Number(commentId),
    });

    if (!comment) {
      return Response.json(
        {
          success: false,
          message: "دیدگاه پیدا نشد.",
        },
        { status: 404 },
      );
    }

    comment.status = "rejected";

    await comment.save();

    return Response.json({
      success: true,
      message: "دیدگاه با موفقیت رد شد.",
      data: comment,
    });
  } catch (error) {
    console.error("REJECT COMMENT ERROR =>", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
