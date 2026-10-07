import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";

const VALID_TABS = [
  "in_progress",
  "sent",
  "returned",
  "cancelled",
  "canceled_system",
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export async function GET(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "برای مشاهده سفارش‌ها وارد حساب کاربری شوید",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
      is_logged_in: true,
    }).select("_id");

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر احراز هویت نشد",
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);

    const activeTab = searchParams.get("activeTab") || "in_progress";
    const q = searchParams.get("q")?.trim() || "";
    const search = searchParams.get("search") === "true";

    const page = Math.max(
      1,
      Number.parseInt(searchParams.get("page") || "1", 10) || 1,
    );

    const limit = 10;

    if (!VALID_TABS.includes(activeTab)) {
      return Response.json(
        {
          success: false,
          message: "تب سفارش معتبر نیست",
        },
        { status: 400 },
      );
    }

    if (!search || !q) {
      return Response.json({
        success: true,
        data: {
          orders: [],
          pager: {
            current_page: 1,
            total_pages: 0,
            total_items: 0,
          },
        },
      });
    }

    const regex = new RegExp(escapeRegex(q), "i");

    console.log("userId =>", user._id);
    console.log("status =>", activeTab);
    console.log("regex =>", regex);

    const filter = {
      userId: user._id,
      status: activeTab,
      $or: [
        { order_code: regex },
        { "items.product.title_fa": regex },
        { "items.product.title": regex },
        { "items.product.name": regex },
      ],
    };

    const totalItems = await OrderModel.countDocuments(filter);

    const toEnglishDigits = (value) =>
      String(value).replace(/[۰-۹]/g, (digit) =>
        String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)),
      );

    const formatPersianDate = (value) => {
      if (!value) return "";

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) return String(value);

      const formatted = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Tehran",
      }).format(date);

      return toEnglishDigits(formatted);
    };

    const orders = await OrderModel.find(filter)
      .sort({ created_at: -1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    console.log("orders =>", orders);

    const formattedOrders = orders.map((order) => ({
      id: order.order_code,
      cart_id: order.cart_id?.toString() ?? null,
      created_at: formatPersianDate(order.created_at),
      payable_price: order.payable_price ?? 0,
      status: order.status,
      status_fa: order.status_fa,
      product_images: order.product_images ?? [],
      payment_method: order.payment_method ?? {},
      order_type: order.order_type ?? "digikala",
      price_details: {
        total_cost: order.price_details?.total_cost ?? 0,
        shipping_cost: order.price_details?.shipping_cost ?? 0,
        discount: order.price_details?.discount ?? 0,
        gift_card: order.price_details?.gift_card ?? 0,
        voucher: order.price_details?.voucher ?? 0,
        user_paid: order.price_details?.user_paid ?? 0,
        user_received: order.price_details?.user_received ?? 0,
      },
      cash_back: {
        amount: order.cash_back?.amount ?? 0,
        digiplus_amount: order.cash_back?.digiplus_amount ?? 0,
        return_days: order.cash_back?.return_days ?? 7,
      },
    }));

    return Response.json({
      status: 200,
      data: {
        orders: formattedOrders,
      },
    });

    return Response.json({
      success: true,
      data: {
        orders,
        pager: {
          current_page: page,
          total_pages: Math.ceil(totalItems / limit),
          total_items: totalItems,
        },
      },
    });
  } catch (error) {
    console.error("ORDER SEARCH ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "جست‌وجوی سفارش‌ها با خطا مواجه شد",
      },
      { status: 500 },
    );
  }
}
