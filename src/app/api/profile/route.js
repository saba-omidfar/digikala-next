import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import OrderModel from "@/models/Order";

export async function GET() {
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

    const [inProgressCount, sentCount, cancelledCount, returnedCount] =
      await Promise.all([
        OrderModel.countDocuments({
          userId: user._id,
          status: "IN_PROGRESS",
        }),

        OrderModel.countDocuments({
          userId: user._id,
          status: "SENT",
        }),

        OrderModel.countDocuments({
          userId: user._id,
          status: "CANCELLED",
        }),

        OrderModel.countDocuments({
          userId: user._id,
          status: "RETURNED",
        }),
      ]);

    return Response.json({
      status: 200,

      data: {
        orders: {
          in_progress: {
            count: inProgressCount,
            title: "جاری",
          },

          sent: {
            count: sentCount,
            title: "تحویل شده",
          },

          cancelled: {
            count: cancelledCount,
            title: "لغو شده",
          },

          returned: {
            count: returnedCount,
            title: "مرجوع شده",
          },
        },

        user_list: {
          title: "از لیست‌های شما",
          discount_percent: null,

          see_more_url: {
            base: null,
            uri: "/profile/lists/",
          },

          products: [],
          background: null,
          icon: null,
          products_count: null,
          data_layer: null,
        },

        most_frequent_bought_products: {
          title: "خریدهای پرتکرار شما",
          discount_percent: null,
          see_more_url: null,
          products: [],
          background: null,
          icon: null,
          products_count: null,
          data_layer: null,
        },

        supercoin: {},
      },
    });
  } catch (err) {
    console.error("Profile API Error:", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
