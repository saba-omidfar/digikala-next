import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import PhoneVerificationCode from "@/models/PhoneVerificationCode";

export async function PATCH(request) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "کاربر وارد نشده است" },
        { status: 401 },
      );
    }

    const currentUser = await UserModel.findOne({
      "auth.accessToken": token,
    });

    if (!currentUser) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    const body = await request.json();
    const phone = body.phone?.trim();

    if (!phone) {
      return NextResponse.json(
        { message: "شماره موبایل وارد نشده است" },
        { status: 400 },
      );
    }

    const phoneRegex = /^09\d{9}$/;

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: "فرمت شماره موبایل صحیح نیست" },
        { status: 400 },
      );
    }

    if (currentUser.user?.phone === phone && currentUser.is_phone_verified) {
      return NextResponse.json({
        success: true,
        already_verified: true,
        message: "این شماره موبایل قبلاً تأیید شده است",
      });
    }

    const existingUser = await UserModel.findOne({
      "user.phone": phone,
      _id: { $ne: currentUser._id },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "این شماره موبایل قبلاً استفاده شده است" },
        { status: 409 },
      );
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const expires_at = new Date(Date.now() + 3 * 60 * 1000);

    await PhoneVerificationCode.deleteMany({
      user_id: currentUser._id,
    });

    await PhoneVerificationCode.create({
      user_id: currentUser._id,
      phone,
      code,
      expires_at,
      attempts: 0,
    });

    return NextResponse.json({
      success: true,
      already_verified: false,
      message: "کد تأیید ایجاد شد",
      demoOtp: code,
      expiresAt: expires_at,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ارسال کد تأیید" },
      { status: 500 },
    );
  }
}
