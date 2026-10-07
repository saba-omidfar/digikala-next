import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne(
      {
        "auth.accessToken": accessToken,
      },
      {
        user: 1,
        is_email_verified: 1,
        is_phone_verified: 1,
        is_verified: 1,
      },
    ).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      email: user.user?.email || "",

      gender: user.user?.gender || "other",

      uuid: user.user?.uuid || "",

      first_name: user.user?.first_name || "",

      last_name: user.user?.last_name || "",

      is_email_verified: user.is_email_verified || false,

      phone_number: user.user?.phone || user.user?.mobile || "",

      is_phone_verified: user.is_phone_verified || false,

      national_identity_number: user.user?.national_identity_number || "",

      is_verified: user.is_verified || false,

      birth_date: user.user?.birthday_iso || "",

      is_foreigner: user.user?.is_foreigner || false,

      has_password: user.user?.has_password || false,
    });
  } catch (error) {
    console.error("GET /api/user/profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت اطلاعات پروفایل",
      },
      { status: 500 },
    );
  }
}
