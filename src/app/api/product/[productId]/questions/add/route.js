import dbConnect from "@/configs/db";

import QuestionModel from "@/models/Question";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

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

    if (!productId) {
      return Response.json(
        {
          success: false,
          message: "محصول پیدا نشد.",
        },
        { status: 404 },
      );
    }

    const newQuestion = await QuestionModel.create({
      source: "local",
      productId,
      text,
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
    console.error(err);

    return Response.json(
      {
        success: false,
        message: "خطایی رخ داده است.",
      },
      { status: 500 },
    );
  }
}
