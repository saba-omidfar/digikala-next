import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import QuestionModel from "@/models/Question";

export async function POST(req, { params }) {
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

    const body = await req.json();

    const { text } = body;

    if (!text?.trim()) {
      return Response.json(
        {
          success: false,
          message: "متن پرسش الزامی است.",
        },
        { status: 400 },
      );
    }

    if (text.trim().length < 3) {
      return Response.json(
        {
          success: false,
          message: "متن پرسش کوتاه است.",
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
          message: "ابتدا وارد حساب کاربری شوید.",
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

    const newQuestion = await QuestionModel.create({
      source: "local",
      productId: Number(productId),
      user_id: user._id,
      text: text.trim(),
      status: "pending",
    });

    return Response.json(
      {
        success: true,
        message: "پرسش با موفقیت ثبت شد",
        data: newQuestion,
      },
      { status: 201 },
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "خطایی رخ داده است.",
      },
      { status: 500 },
    );
  }
}
