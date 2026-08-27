import dbConnect from "@/configs/db";

import CommentModel from "@/models/Comment";

import { digikalaFetch } from "@/lib/digikala";
import formatPersianDate from "@/utils/formatPersianDate";
import getRelativeDate from "@/utils/getRelativeDate";

export async function GET(req, { params }) {
  await dbConnect();

  const { productId } = await params;

  const searchParams = req.nextUrl.searchParams;

  const sort = req.nextUrl.searchParams.get("sort") || "default";
  const intent = req.nextUrl.searchParams.get("intent");

  if (intent) {
    searchParams.set("intent", intent);
  }

  const path = `/v1/rate-review/products/${productId}?${searchParams.toString()}`;

  const [dkRes, localComments] = await Promise.all([
    digikalaFetch({
      path,
    }),
    CommentModel.find({ product_id: productId }),
  ]);

  const digikalaData = dkRes?.data ?? {};
  const digikalaComments = digikalaData.comments ?? [];

  const digikalaIds = new Set(
    digikalaComments.map((comment) => Number(comment.id)),
  );

  const localOnlyComments = localComments
    .filter((comment) => !digikalaIds.has(Number(comment.id)))
    .map((comment) => comment.toObject())
    .sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);

        case "buyers":
          return Number(b.is_buyer) - Number(a.is_buyer);

        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    })
    .map((comment) => ({
      ...comment,
      source: "local",
      relative_date: getRelativeDate(comment.created_at),
      created_at: formatPersianDate(comment.created_at),
    }));

  const comments = [
    ...localOnlyComments,
    ...digikalaComments.map((comment) => ({
      ...comment,
      source: "digikala",
      relative_date:
        comment.relative_date || getRelativeDate(comment.created_at),
    })),
  ];

  return Response.json({
    data: {
      ...digikalaData,
      comments,
      pager: {
        ...digikalaData.pager,
        total_items:
          (digikalaData.pager?.total_items ?? 0) + localOnlyComments.length,
      },
    },
  });
}
