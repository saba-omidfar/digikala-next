import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import PhoneVerificationCode from "@/models/PhoneVerificationCode";

export async function POST(request) {
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

    const body = await request.json();
    const phone = body.phone?.trim();

    if (!phone) {
      return NextResponse.json(
        { message: "شماره موبایل وارد نشده است" },
        { status: 400 },
      );
    }

    const currentUser = await UserModel.findOne({
      "auth.accessToken": token,
    });

    if (!currentUser) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    await PhoneVerificationCode.deleteMany({
      user_id: currentUser._id,
    });

    await PhoneVerificationCode.create({
      user_id: currentUser._id,
      phone,
      code,
      expires_at: new Date(Date.now() + 3 * 60 * 1000),
    });

    return NextResponse.json({
      success: true,
      message: "کد تأیید مجدداً ایجاد شد",
      demoOtp: code,
      expiresAt: expires_at,
    });
  } catch (error) {
    console.error("RESEND EMAIL ERROR:", error);

    return NextResponse.json(
      { message: "خطا در ارسال مجدد کد تأیید" },
      { status: 500 },
    );
  }
}
