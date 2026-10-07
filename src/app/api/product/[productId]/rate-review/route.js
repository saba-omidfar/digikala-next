import dbConnect from "@/configs/db";

import CommentModel from "@/models/Comment";
import FeedbackModel from "@/models/Feedbacks";

import { digikalaFetch } from "@/lib/digikala";
import formatPersianDate from "@/utils/formatPersianDate";
import getRelativeDate from "@/utils/getRelativeDate";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const searchParams = req.nextUrl.searchParams;

    const sort = searchParams.get("sort") || "default";
    const intent = searchParams.get("intent");

    if (intent) {
      searchParams.set("intent", intent);
    }

    const path = `/v1/rate-review/products/${productId}/?${searchParams.toString()}`;

    const [dkRes, localComments] = await Promise.all([
      digikalaFetch({
        path,
      }),

      CommentModel.find({
        product_id: productId,
      }).lean(),
    ]);

    const digikalaData = dkRes?.data ?? {};
    const digikalaComments = digikalaData.comments ?? [];

    const digikalaIds = new Set(
      digikalaComments.map((comment) => Number(comment.id)),
    );

    const localOnlyComments = localComments
      .filter((comment) => !digikalaIds.has(Number(comment.id)))
      .sort((a, b) => {
        switch (sort) {
          case "newest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );

          case "buyers":
            return Number(b.is_buyer) - Number(a.is_buyer);

          default:
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
        }
      })
      .map((comment) => ({
        ...comment,
        source: "local",
        relative_date: getRelativeDate(comment.created_at),
        created_at: formatPersianDate(comment.created_at),
      }));

    const formattedDigikalaComments = digikalaComments.map((comment) => ({
      ...comment,
      source: "digikala",
      relative_date:
        comment.relative_date || getRelativeDate(comment.created_at),
    }));

    const comments = [...localOnlyComments, ...formattedDigikalaComments];

    const commentIds = comments
      .map((comment) => Number(comment.id))
      .filter((id) => !Number.isNaN(id));

    let feedbackMap = new Map();

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

    const commentsWithFeedback = comments.map((comment) => {
      const commentId = Number(comment.id);

      const feedback = feedbackMap.get(commentId);

      return {
        ...comment,

        reactions: {
          ...(comment.reactions || {}),

          likes: feedback?.likes ?? comment.reactions?.likes ?? 0,

          dislikes: feedback?.dislikes ?? comment.reactions?.dislikes ?? 0,
        },
      };
    });

    return Response.json({
      data: {
        ...digikalaData,

        comments: commentsWithFeedback,

        pager: {
          ...digikalaData.pager,

          total_items:
            (digikalaData.pager?.total_items ?? 0) + localOnlyComments.length,
        },
      },
    });
  } catch (error) {
    console.error("GET /api/product/[productId]/rate-review error:", error);

    return Response.json(
      {
        success: false,
        message: "خطا در دریافت نظرات",
      },
      {
        status: 500,
      },
    );
  }
}
