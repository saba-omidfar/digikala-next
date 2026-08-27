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
    const { productId, text, source } = body;

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

    let questionDoc = await QuestionModel.findOne({
      productId,
      id: Number(questionId),
      ...(source === "digikala" ? { source: "digikala" } : { source: "local" }),
    });

    if (!questionDoc) {
      if (source === "digikala") {
        const data = await digikalaFetch({
          path: `/v1/product/${productId}/questions/`,
        });

        const question = data?.data?.questions?.find(
          (q) => String(q.id) === String(questionId),
        );

        if (!question) {
          return Response.json(
            { message: "Question not found" },
            { status: 404 },
          );
        }

        questionDoc = await QuestionModel.create({
          source: "digikala",
          productId,
          id: questionId,
          user_id: user._id,
          question: question.questionText,
        });
      } else {
        questionDoc = await QuestionModel.create({
          source: "local",
          productId,
          id: questionId,
          user_id: user._id,
          question: "",
        });
      }
    }

    if (!questionDoc.answers) {
      questionDoc.answers = [];
    }

    const sender = user?.user?.first_name
      ? `${user.user.first_name} ${user.user.last_name}`
      : user?.user?.phone;

    questionDoc.answers.push({
      user_id: user._id,
      text,
      sender,
    });

    questionDoc.answerCount = (questionDoc.answerCount || 0) + 1;

    await questionDoc.save();

    return Response.json(
      {
        success: true,
        message: "پاسخ با موفقیت ثبت شد",
        data: questionDoc,
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
