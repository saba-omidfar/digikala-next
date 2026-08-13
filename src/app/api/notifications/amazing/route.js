import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import AmazingNotificationModel from "@/models/AmazingNotifications";

export async function POST(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "کاربر احراز هویت نشده است" },
        { status: 401 },
      );
    }

    const { productId, channels = {} } = await req.json();

    if (!productId) {
      return Response.json(
        { success: false, message: "productId الزامی است" },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({ "auth.token": token }).lean();
    if (!user?._id) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    const existing = await AmazingNotificationModel.findOne({
      userId: user._id,
      productId: Number(productId),
    });

    // 🔴 toggle remove
    if (existing) {
      await AmazingNotificationModel.deleteOne({ _id: existing._id });

      return Response.json(
        { success: true, action: "remove" },
        { status: 200 },
      );
    }

    // 🟢 add
    await AmazingNotificationModel.create({
      userId: user._id,
      productId: Number(productId),
      channels: {
        email: !!channels.email,
        sms: !!channels.sms,
        notification: !!channels.notification,
      },
    });

    return Response.json({ success: true, action: "add" }, { status: 201 });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
