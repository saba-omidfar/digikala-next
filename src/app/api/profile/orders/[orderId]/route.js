import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { orderId } = await params;

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
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
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    const order = await OrderModel.findOne({
      userId: user._id,
      order_code: orderId,
    }).lean();

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "سفارش پیدا نشد",
        },
        { status: 404 },
      );
    }

    return Response.json({
      status: 200,
      data: {
        order: {
          id: order.order_code,
          cart_id: order.cart_id,
          created_at:
            typeof order.created_at === "string"
              ? order.created_at
              : new Intl.DateTimeFormat("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(order.created_at)),
          payable_price: order.payable_price,
          status: order.status,
          status_fa: order.status_fa,

          product_images: order.product_images ?? [],

          payment_method: order.payment_method,

          order_type: order.order_type,
          remaining_amount: order.remaining_amount,

          order_items: order.items.map((item) => ({
            ...item,
          })),

          shipments: order.shipments ?? [],

          invoice_url: order.invoice_url,
          price_details: order.price_details,
          cash_back: order.cash_back,

          address: order.shipping_address,

          late_payment: order.late_payment ?? {
            is_button_active: false,
          },
        },
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "دریافت جزئیات سفارش با خطا مواجه شد",
      },
      { status: 500 },
    );
  }
}
