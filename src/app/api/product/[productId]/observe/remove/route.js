import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import AmazingNotificationModel from "@/models/AmazingNotifications";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر احراز هویت نشده است",
        },
        {
          status: 401,
        },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).lean();

    if (!user?._id) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        {
          status: 404,
        },
      );
    }

    await AmazingNotificationModel.deleteOne({
      userId: user._id,
      productId: Number(productId),
      type: "on_incredible_offer",
    });

    return Response.json({
      success: true,
      action: "remove",
    });
  } catch (err) {
    console.error("Remove amazing notification error:", err);

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
