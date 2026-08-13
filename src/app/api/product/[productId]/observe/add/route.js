import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import AmazingNotificationModel from "@/models/AmazingNotifications";

export async function POST(req, { params }) {
  await dbConnect();

  const { productId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json(
      { success: false, message: "کاربر احراز هویت نشده است" },
      { status: 401 },
    );
  }

  const user = await UserModel.findOne({ "auth.token": token }).lean();
  if (!user?._id) {
    return Response.json(
      { success: false, message: "کاربر یافت نشد" },
      { status: 404 },
    );
  }

  const {
    send_sms = false,
    send_email = false,
    send_notification = false,
  } = await req.json();

  const existing = await AmazingNotificationModel.findOne({
    userId: user._id,
    productId: Number(productId),
    type: "on_incredible_offer",
  });

  if (existing) {
    return Response.json(
      {
        success: false,
        message: "قبلا ثبت شده",
      },
      { status: 409 },
    );
  }

  await AmazingNotificationModel.create({
    userId: user._id,
    productId: Number(productId),
    type: "on_incredible_offer",
    send_sms,
    send_email,
    send_notification,
  });

  return Response.json({
    success: true,
    action: "add",
  });
}
