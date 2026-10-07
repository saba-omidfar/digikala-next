import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import OrderModel from "@/models/Order";
import CommentModel from "@/models/Comment";

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

    const orders = await OrderModel.find({
      userId: user._id,
      status: "SENT",
    })
      .sort({ createdAt: -1 })
      .lean();

    const orderItems = orders.flatMap((order) =>
      (order.items || []).map((item) => ({
        item,
        order,
      })),
    );

    if (!orderItems.length) {
      return Response.json({
        status: 200,
        data: {
          orders: [],
          pager: {
            current_page: page,
            total_pages: 1,
            total_items: 0,
          },
        },
      });
    }

    const comments = await CommentModel.find({
      user_id: user._id,
      order_item_id: {
        $in: orderItems
          .map(({ item }) => item.order_item_id || item.orderItemId || item.id)
          .filter(Boolean),
      },
    })
      .select("order_item_id")
      .lean();

    const reviewedOrderItemIds = new Set(
      comments.map((comment) => String(comment.order_item_id)),
    );

    const waitForReviewItems = orderItems.filter(({ item }) => {
      const orderItemId = item.order_item_id || item.orderItemId || item.id;

      if (!orderItemId) return false;

      return !reviewedOrderItemIds.has(String(orderItemId));
    });

    const reviewableItems = await Promise.all(
      waitForReviewItems.map(async ({ item }) => {
        try {
          const productId =
            item.product_id || item.productId || item.product?.id;

          if (!productId) {
            return null;
          }

          const data = await digikalaFetch({
            path: `/product/v1/products/${productId}/?_rch=9fd46e644c8e`,
          });

          const product = data?.data?.product;

          if (!product) {
            return null;
          }

          const seller =
            item.seller || item.product_variant_info?.seller || null;

          const color = item.color || item.product_variant_info?.color || null;

          return {
            order_item_id: item.order_item_id || item.orderItemId || item.id,

            rate: null,

            product,

            product_variant_info: {
              seller: seller
                ? {
                    id: seller.id,
                    title: seller.title,
                    company_name: seller.company_name || null,
                    code: seller.code,
                    rate: seller.rate,
                  }
                : null,

              ...(color
                ? {
                    color: {
                      id: color.id,
                      title: color.title,
                      hex_code: color.hex_code,
                    },
                  }
                : {}),
            },

            relative_date: formatDate(
              item.createdAt || item.created_at || item.date,
            ),

            created_at: formatDate(
              item.createdAt || item.created_at || item.date,
            ),
          };
        } catch (error) {
          console.error("Get wait-for-review product error:", error);

          return null;
        }
      }),
    );

    const validItems = reviewableItems.filter(Boolean);

    const totalItems = validItems.length;

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    const startIndex = (page - 1) * limit;

    const paginatedItems = validItems.slice(startIndex, startIndex + limit);

    return Response.json({
      status: 200,
      data: {
        orders: paginatedItems,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (err) {
    console.error("Get wait for review error:", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
