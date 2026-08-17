import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import AmazingNotificationModel from "@/models/AmazingNotifications";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json({
        is_active: false,
      });
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).lean();

    if (!user) {
      return Response.json({
        is_active: false,
      });
    }

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
  } catch (err) {
    console.error("Amazing notification error:", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
