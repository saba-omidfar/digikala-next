import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import CommentModel from "@/models/Comment";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const body = await req.json();

    const { comment, is_anonymous = false, rating = 0, purchased_item } = body;

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
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 401 });
    }

    const newComment = await CommentModel.create({
      product_id: productId,
      user_id: user._id,
      body: comment.trim(),
      is_anonymous,
      rating,
      purchased_item,
    });

    return Response.json(
      {
        success: true,
        message: "دیدگاه با موفقیت ثبت شد",
        data: newComment,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("SUBMIT COMMENT ERROR =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
