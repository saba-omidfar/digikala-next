import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import NotificationModel from "@/models/Notification";

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

    const type = searchParams.get("type") || "all";

    const limit = 20;

    const filter = {
      user_id: user._id,
    };

    if (type !== "all") {
      filter.type = type;
    }

    const [notifications, totalItems] = await Promise.all([
      NotificationModel.find(filter)
        .sort({ date: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      NotificationModel.countDocuments(filter),
    ]);

    const formattedNotifications = notifications.map((notification) => ({
      id: notification.id,

      title: notification.title,

      message: notification.message,

      main_image: notification.main_image || [],

      images: notification.images || [],

      url: {
        base: notification.url?.base ?? null,

        uri: notification.url?.uri || "",
      },

      tab_type: notification.tab_type || "alert",

      type: notification.type || "inform",

      status: notification.status || "unseen",

      date: new Date(
        notification.date || notification.createdAt,
      ).toLocaleDateString("fa-IR", {
        day: "numeric",
        month: "long",
      }),

      action_title: notification.action_title || "",

      icon: {
        image: notification.icon?.image || "",
      },

      is_expired: Boolean(notification.is_expired),

      expiration_text:
        notification.expiration_text || "این پیام منقضی شده است.",

      action: notification.action || [],

      provider_click_url: notification.provider_click_url ?? null,
    }));

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    return Response.json({
      status: 200,

      data: {
        alert: null,

        notifications: formattedNotifications,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (err) {
    console.error("Get notifications error:", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
