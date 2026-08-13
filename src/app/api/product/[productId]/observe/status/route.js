import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import AmazingNotificationModel from "@/models/AmazingNotifications";

export async function GET(req, { params }) {
  await dbConnect();

  const { productId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({
      is_active: false,
    });
  }

  const user = await UserModel.findOne({
    "auth.token": token,
  }).lean();

  const notification = await AmazingNotificationModel.findOne({
    userId: user._id,
    productId: Number(productId),
    type: "on_incredible_offer",
  }).lean();

  return Response.json({
    is_active: !!notification,
    send_sms: notification?.send_sms ?? false,
    send_email: notification?.send_email ?? false,
    send_notification: notification?.send_notification ?? false,
  });
}
