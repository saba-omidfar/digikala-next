import dbConnect from "@/configs/db";

import QuestionModel from "@/models/Question";

import { digikalaFetch } from "@/lib/digikala";
import formatPersianDate from "@/utils/formatPersianDate";

export async function GET(req, { params }) {
  await dbConnect();

  const { productId } = await params;

  const page = Number(req.nextUrl.searchParams.get("page") || 1);
  const sort = req.nextUrl.searchParams.get("sort") || "created_at";

  const path = `/v1/product/${productId}/questions/?page=${page}&sort=${sort}`;

  const [dkRes, localQuestions] = await Promise.all([
    digikalaFetch({
      path,
      headers: req.headers,
    }),
    QuestionModel.find({ productId }),
  ]);

  const digikalaData = dkRes?.data ?? {};
  const digikalaQuestions = digikalaData.questions ?? [];

  const localMap = new Map(localQuestions.map((q) => [Number(q.id), q]));

  const digikalaIds = new Set(digikalaQuestions.map((q) => Number(q.id)));

  const mergedQuestions = digikalaQuestions.map((question) => {
    const local = localMap.get(Number(question.id));

    return {
      ...question,
      source: "digikala",
      answers: [
        ...(question.answers ?? []),
        ...(local?.answers?.map((answer) => ({
          ...answer.toObject(),
          created_at: formatPersianDate(answer.created_at),
        })) ?? []),
      ],
      answer_count:
        (question.answer_count ?? 0) + (local?.answers?.length ?? 0),
    };
  });

  const localOnlyQuestions = localQuestions
    .filter((q) => !digikalaIds.has(Number(q.id)))
    .map((q) => q.toObject())
    .sort((a, b) => {
      switch (sort) {
        case "answers":
          return (b.answers?.length || 0) - (a.answers?.length || 0);

        case "created_at":
        default:
          return new Date(b.created_at) - new Date(a.created_at);
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
}
