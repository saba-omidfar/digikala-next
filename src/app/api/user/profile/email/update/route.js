import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import EmailVerificationCode from "@/models/EmailVerificationCode";
import { sendVerificationEmail } from "@/configs/sendEmail";

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
    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { message: "ایمیل وارد نشده است" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "فرمت ایمیل صحیح نیست" },
        { status: 400 },
      );
    }

    if (
      currentUser.user?.email?.toLowerCase() === email &&
      currentUser.is_email_verified
    ) {
      return NextResponse.json({
        success: true,
        already_verified: true,
        message: "این ایمیل قبلاً تأیید شده است",
      });
    }

    const existingUser = await UserModel.findOne({
      "user.email": email,
      _id: { $ne: currentUser._id },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "این ایمیل قبلاً استفاده شده است" },
        { status: 409 },
      );
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const expires_at = new Date(Date.now() + 3 * 60 * 1000);

    await EmailVerificationCode.deleteMany({
      user_id: currentUser._id,
    });

    await EmailVerificationCode.create({
      user_id: currentUser._id,
      email,
      code,
      expires_at,
    });

    await sendVerificationEmail(
      email,
      code,
      currentUser.user?.first_name || "کاربر",
    );

    return NextResponse.json({
      success: true,
      already_verified: false,
      message: "کد تأیید به ایمیل شما ارسال شد",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ارسال کد تأیید" },
      { status: 500 },
    );
  }
}
