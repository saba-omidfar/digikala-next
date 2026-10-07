import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import OrderModel from "@/models/Order";

import mockReturns from "@/data/mockReturns";
import muckCancelled from "@/data/muckCancelled";

export async function GET(request) {
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

    const { searchParams } = new URL(request.url);

    const activeTab = searchParams.get("activeTab");

    const statusMap = {
      in_progress: "IN_PROGRESS",
      sent: "SENT",
      cancelled: "CANCELLED",
      returned: "RETURNED",
    };

    const query = {
      userId: user._id,
    };

    if (activeTab && statusMap[activeTab]) {
      query.status = statusMap[activeTab];
    }

    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;

    const totalItems = await OrderModel.countDocuments(query);

    const totalPages = Math.ceil(totalItems / limit);

    const orders = await OrderModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const [inProgressCount, sentCount] = await Promise.all([
      OrderModel.countDocuments({
        userId: user._id,
        status: "in_progress",
      }),

      OrderModel.countDocuments({
        userId: user._id,
        status: "sent",
      }),
    ]);

    const cancelledCount = muckCancelled.length;

    const returnedCount = mockReturns.length;

    return Response.json({
      status: 200,

      data: {
        orders,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },

        refunds_summary: {
          count: 0,
          need_action: false,
        },

        tabs: {
          in_progress: {
            count: inProgressCount,
            title: "جاری",
          },

          sent: {
            count: sentCount,
            title: "تحویل شده",
          },

          returned: {
            count: returnedCount,
            title: "مرجوع شده",
          },

          cancelled: {
            count: cancelledCount,
            title: "لغو شده",
          },
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
