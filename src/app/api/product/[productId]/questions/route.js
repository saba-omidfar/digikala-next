import dbConnect from "@/configs/db";

import QuestionModel from "@/models/Question";

import { digikalaFetch } from "@/lib/digikala";
import formatPersianDate from "@/utils/formatPersianDate";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const page = Math.max(Number(req.nextUrl.searchParams.get("page")) || 1, 1);

    const sort = req.nextUrl.searchParams.get("sort") || "created_at";

    const path = `/v1/product/${productId}/questions/?page=${page}&sort=${sort}`;

    const [dkRes, localQuestions] = await Promise.all([
      digikalaFetch({
        path,
      }),

      QuestionModel.find({
        productId: Number(productId),
        status: "accepted",
      }).sort({
        created_at: -1,
      }),
    ]);

    const digikalaData = dkRes?.data ?? {};
    const digikalaQuestions = digikalaData.questions ?? [];

    const localMap = new Map(
      localQuestions.map((question) => [Number(question.id), question]),
    );

    const digikalaIds = new Set(
      digikalaQuestions.map((question) => Number(question.id)),
    );

    const mergedQuestions = digikalaQuestions.map((question) => {
      const local = localMap.get(Number(question.id));

      const localAnswers =
        local?.answers?.map((answer) => ({
          ...answer.toObject(),
          created_at: formatPersianDate(answer.created_at),
        })) ?? [];

      return {
        ...question,

        source: "digikala",

        answers: [...(question.answers ?? []), ...localAnswers],

        answer_count: (question.answer_count ?? 0) + localAnswers.length,
      };
    });

    const localOnlyQuestions = localQuestions
      .filter((question) => !digikalaIds.has(Number(question.id)))
      .map((question) => question.toObject())
      .sort((a, b) => {
        switch (sort) {
          case "answers":
            return (b.answers?.length || 0) - (a.answers?.length || 0);

          case "created_at":
          default:
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
        }
      })
      .map((question) => ({
        ...question,

        source: "local",

        created_at: formatPersianDate(question.created_at),

        answers:
          question.answers?.map((answer) => ({
            ...answer,
            created_at: formatPersianDate(answer.created_at),
          })) ?? [],

        answer_count: question.answerCount ?? question.answers?.length ?? 0,
      }));

    let questions = mergedQuestions;

    if (page === 1) {
      questions = [...localOnlyQuestions, ...mergedQuestions];
    }

    return Response.json({
      data: {
        ...digikalaData,

        questions,

        pager: {
          ...digikalaData.pager,

          total_items:
            (digikalaData.pager?.total_items ?? 0) + localOnlyQuestions.length,
        },
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "خطا در دریافت پرسش‌ها.",
      },
      { status: 500 },
    );
  }
}
