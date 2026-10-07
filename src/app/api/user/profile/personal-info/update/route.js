import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function PATCH(request) {
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

    const body = await request.json();

    const { first_name, last_name, national_identity_number, birth_date } =
      body;

    if (!first_name || !last_name || !national_identity_number || !birth_date) {
      return NextResponse.json(
        {
          success: false,
          message: "تمام اطلاعات الزامی است",
        },
        { status: 400 },
      );
    }

    const user = await UserModel.findOneAndUpdate(
      {
        "auth.accessToken": accessToken,
      },
      {
        $set: {
          "user.first_name": first_name,
          "user.last_name": last_name,
          "user.national_identity_number": national_identity_number,
          "user.birthday_iso": birth_date,
          is_verified: true,
        },
      },
      {
        new: true,
      },
    ).lean();

    if (!user?.is_logged_in) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
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
      },
    });
  } catch (error) {
    console.error("PATCH /api/user/profile/personal-info/update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در به‌روزرسانی اطلاعات شخصی",
      },
      { status: 500 },
    );
  }
}
