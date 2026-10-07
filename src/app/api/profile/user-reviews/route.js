import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import CommentModel from "@/models/Comment";
import FeedbackModel from "@/models/Feedbacks";

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

    const limit = 10;

    const filter = {
      user_id: user._id,
    };

    const [comments, totalItems] = await Promise.all([
      CommentModel.find(filter)
        .sort({ created_at: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      CommentModel.countDocuments(filter),
    ]);

    const commentIds = comments
      .map((comment) => Number(comment.id))
      .filter((id) => !Number.isNaN(id));

    const feedbackMap = new Map();

    if (commentIds.length > 0) {
      const feedbacks = await FeedbackModel.aggregate([
        {
          $match: {
            targetType: "comment",
            targetId: {
              $in: commentIds,
            },
          },
        },

        {
          $group: {
            _id: {
              targetId: "$targetId",
              type: "$type",
            },

            count: {
              $sum: 1,
            },
          },
        },
      ]);

      feedbacks.forEach((item) => {
        const targetId = Number(item._id.targetId);
        const type = item._id.type;

        if (!feedbackMap.has(targetId)) {
          feedbackMap.set(targetId, {
            likes: 0,
            dislikes: 0,
          });
        }

        if (type === "like") {
          feedbackMap.get(targetId).likes = item.count;
        }

        if (type === "dislike") {
          feedbackMap.get(targetId).dislikes = item.count;
        }
      });
    }

    const reviews = await Promise.all(
      comments.map(async (comment) => {
        let product = {};

        try {
          if (comment.product_id) {
            const data = await digikalaFetch({
              path: `/product/v1/products/${comment.product_id}/?_rch=9fd46e644c8e`,
            });

            product = data?.data?.product || {};
          }
        } catch (error) {
          console.error(
            `Get review product ${comment.product_id} error:`,
            error,
          );
        }

        const feedback = feedbackMap.get(Number(comment.id));

        return {
          order_item_id: comment.order_item_id || 0,

          product_id: comment.product_id || 0,

          rate: comment.rate ?? 0,

          review_user_type: comment.review_user_type || "user",

          is_anonymous: Boolean(comment.is_anonymous),

          user_id: user._id,

          id: comment.id,

          body: comment.body,

          status: comment.status || "approved",

          reactions: {
            ...(comment.reactions || {}),

            likes: feedback?.likes ?? comment.reactions?.likes ?? 0,

            dislikes: feedback?.dislikes ?? comment.reactions?.dislikes ?? 0,
          },

          advantages: comment.advantages || [],

          disadvantages: comment.disadvantages || [],

          is_buyer: comment.is_buyer ?? 1,

          user_name: comment.is_anonymous
            ? "کاربر دیجی‌کالا"
            : comment.user_name,

          created_at: formatDate(comment.created_at),

          relative_date: formatDate(comment.created_at),

          product,

          files: comment.files || [],

          ...(comment.purchased_item
            ? {
                purchased_item: comment.purchased_item,
              }
            : {}),
        };
      }),
    );

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    return Response.json({
      status: 200,

      data: {
        reviews,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (err) {
    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
