import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import QuestionModel from "@/models/Question";

import { digikalaFetch } from "@/lib/digikala";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { questionId } = await params;

    const body = await req.json();

    const { productId, text } = body;

    if (!questionId) {
      return Response.json(
        {
          success: false,
          message: "پرسش پیدا نشد.",
        },
        { status: 404 },
      );
    }

    if (!productId) {
      return Response.json(
        {
          success: false,
          message: "محصول پیدا نشد.",
        },
        { status: 400 },
      );
    }

    if (!text?.trim()) {
      return Response.json(
        {
          success: false,
          message: "متن پاسخ الزامی است.",
        },
        { status: 400 },
      );
    }

    if (text.trim().length < 3) {
      return Response.json(
        {
          success: false,
          message: "متن پاسخ کوتاه است.",
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

    let question = await QuestionModel.findOne({
      id: Number(questionId),
    });

    if (!question) {
      let page = 1;
      let digikalaQuestion = null;

      const maxPages = 100;

      while (!digikalaQuestion && page <= maxPages) {
        const path = `/v1/product/${productId}/questions/?page=${page}&sort=created_at`;

        const dkRes = await digikalaFetch({
          path,
        });

        const digikalaData = dkRes?.data ?? {};

        const digikalaQuestions = digikalaData.questions ?? [];

        digikalaQuestion = digikalaQuestions.find(
          (item) => Number(item.id) === Number(questionId),
        );

        if (!digikalaQuestion) {
          if (digikalaQuestions.length === 0) {
            break;
          }

          const totalPages =
            digikalaData.pager?.total_pages ??
            digikalaData.pager?.total_pages_count;

          if (totalPages && page >= totalPages) {
            break;
          }

          page++;
        }
      }

      if (!digikalaQuestion) {
        return Response.json(
          {
            success: false,
            message: "پرسش پیدا نشد.",
          },
          { status: 404 },
        );
      }

      question = await QuestionModel.create({
        id: Number(digikalaQuestion.id),

        source: "digikala",

        productId: Number(productId),

        text: digikalaQuestion.text || "",

        status: "accepted",

        sender: digikalaQuestion.sender || "",

        answerCount: digikalaQuestion.answer_count || 0,

        answers: [],
      });
    }

    const sender = user?.user?.first_name
      ? `${user.user.first_name} ${user.user.last_name || ""}`.trim()
      : user?.user?.phone || "کاربر دیجی‌کالا";

    question.answers.push({
      user_id: user._id,
      text: text.trim(),
      status: "pending",
      sender,
      type: "user",
    });

    question.answerCount = (question.answerCount || 0) + 1;

    await question.save();

    return Response.json(
      {
        success: true,
        message: "پاسخ با موفقیت ثبت شد.",
        data: question,
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
