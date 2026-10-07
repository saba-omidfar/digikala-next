import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";

import muckCancelled from "@/data/muckCancelled";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
          orders: [],
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
          message: "کاربر پیدا نشد",
          orders: [],
        },
        { status: 404 },
      );
    }

    const { searchParams } = new URL(req.url);

    const activeTab = searchParams.get("activeTab") || "in_progress";
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const limit = 10;
    const skip = (page - 1) * limit;

    if (activeTab === "cancelled") {
      const totalItems = muckCancelled.length;
      const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

      const cancelledOrders = muckCancelled.slice(skip, skip + limit);

      return Response.json({
        success: true,
        data: {
          orders: cancelledOrders,
          pager: {
            current_page: page,
            total_pages: totalPages,
            total_items: totalItems,
          },
        },
      });
    }

    const statusMap = {
      in_progress: ["in_progress"],
      sent: ["sent"],
    };

    const statuses = statusMap[activeTab] || statusMap.in_progress;

    const filter = {
      userId: user._id,
      status: { $in: statuses },
    };

    const [orders, totalItems] = await Promise.all([
      OrderModel.find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      OrderModel.countDocuments(filter),
    ]);

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    const formattedOrders = orders.map((order) => ({
      ...order,
      created_at: new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(order.created_at)),
    }));

    return Response.json({
      success: true,
      data: {
        orders: formattedOrders,
        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "دریافت سفارش‌ها با خطا مواجه شد",
        orders: [],
      },
      { status: 500 },
    );
  }
}
