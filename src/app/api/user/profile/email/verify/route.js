import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import EmailVerificationCode from "@/models/EmailVerificationCode";

export async function POST(request) {
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

    const code = body.code?.trim();

    if (!/^\d{5}$/.test(code)) {
      return NextResponse.json(
        {
          success: false,
          message: "کد تأیید باید ۵ رقمی باشد",
        },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user?.is_logged_in) {
      return NextResponse.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    const verificationCode = await EmailVerificationCode.findOne({
      user_id: user._id,
    }).sort({ createdAt: -1 });

    if (!verificationCode) {
      return NextResponse.json(
        {
          success: false,
          message: "کد تأیید پیدا نشد",
        },
        { status: 400 },
      );
    }

    if (verificationCode.expires_at.getTime() < Date.now()) {
      await verificationCode.deleteOne();

      return NextResponse.json(
        {
          success: false,
          message: "کد تأیید ایمیل نامعتبر یا منقضی شده است",
        },
        { status: 400 },
      );
    }

    if (verificationCode.attempts >= 5) {
      await verificationCode.deleteOne();

      return NextResponse.json(
        {
          success: false,
          message: "تعداد تلاش‌های وارد کردن کد بیش از حد مجاز است",
        },
        { status: 429 },
      );
    }

    if (verificationCode.code !== code) {
      verificationCode.attempts += 1;
      await verificationCode.save();

      return NextResponse.json(
        {
          success: false,
          message: "کد تأیید اشتباه است",
        },
        { status: 400 },
      );
    }

    user.user.email = verificationCode.email;
    user.is_email_verified = true;

    await user.save();

    await verificationCode.deleteOne();

    return NextResponse.json({
      success: true,
      message: "ایمیل با موفقیت تأیید شد",
      data: {
        email: user.user?.email || "",
        is_email_verified: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "خطا در تأیید ایمیل",
      },
      { status: 500 },
    );
  }
}
