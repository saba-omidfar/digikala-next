import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import QuestionModel from "@/models/Question";

import { digikalaFetch } from "@/lib/digikala";

function formatDate(date) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          status: 401,
          message: "کاربر وارد نشده است",
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
          status: 401,
          message: "کاربر پیدا نشد",
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const activeTab = searchParams.get("activeTab") || "comments";

    const limit = 10;

    const filter = {
      user_id: user._id,
    };

    const [questions, totalItems] = await Promise.all([
      QuestionModel.find(filter)
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      QuestionModel.countDocuments(filter),
    ]);

    const formattedQuestions = await Promise.all(
      questions.map(async (question) => {
        let product = {};

        try {
          if (question.productId) {
            const data = await digikalaFetch({
              path: `/product/v1/products/${question.productId}/?_rch=9fd46e644c8e`,
            });

            product = data?.data?.product || {};
          }
        } catch (error) {
          console.error(
            `Get question product ${question.productId} error:`,
            error,
          );
        }

        const answers = (question.answers || []).map((answer) => ({
          id: answer.id,

          user_id: answer.user_id,

          text: answer.text,

          reactions: {
            likes: answer.reactions?.likes || 0,

            dislikes: answer.reactions?.dislikes || 0,
          },

          created_at: formatDate(answer.created_at),

          files: answer.files || [],

          sender: answer.sender,

          type: answer.type || "user",

          marketplace_seller_id: answer.marketplace_seller_id ?? null,

          user_reaction: answer.user_reaction ?? null,

          has_qa_badge: answer.has_qa_badge ?? false,

          social_profile: answer.social_profile || {},
        }));

        return {
          id: question.id,

          status: question.status || "accepted",

          text: question.text,

          answer_count: answers.length,

          sender: question.sender || "",

          created_at: formatDate(question.created_at),

          answers,

          product,
        };
      }),
    );

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    return Response.json({
      status: 200,
      data: {
        questions: formattedQuestions,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (err) {
    console.error("Get user questions error:", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
