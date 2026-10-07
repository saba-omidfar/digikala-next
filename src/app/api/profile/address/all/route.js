import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر وارد نشده است.",
          addresses: [],
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
          message: "کاربر پیدا نشد.",
          addresses: [],
        },
        { status: 404 },
      );
    }

    return Response.json({
      status: 200,
      addresses: user.addresses || [],
    });
  } catch (error) {
    console.error("GET /api/profile/address/all error:", error);

    return Response.json(
      {
        success: false,
        message: "دریافت آدرس‌ها با خطا مواجه شد.",
        addresses: [],
      },
      { status: 500 },
    );
  }
}
