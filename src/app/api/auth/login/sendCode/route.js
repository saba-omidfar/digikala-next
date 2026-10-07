import dbConnect from "@/configs/db";
import { sendVerificationEmail } from "@/configs/sendEmail";

import UserModel from "@/models/User";
import OTPModel from "@/models/Otp";

const OTP_VALIDITY_SECONDS = 3 * 60;

export async function POST(req) {
  try {
    await dbConnect();

    const { username, guestCartId, purpose } = await req.json();

    if (!username) {
      return Response.json(
        {
          message: "وارد کردن ایمیل یا شماره همراه اجباری است.",
        },
        {
          status: 400,
        },
      );
    }

    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const normalizedUsername = username.trim();

    const isPhone = phoneRegex.test(normalizedUsername);
    const isEmail = emailRegex.test(normalizedUsername);

    if (!isPhone && !isEmail) {
      return Response.json(
        {
          message: "فرمت ایمیل یا شماره همراه نادرست است.",
        },
        {
          status: 400,
        },
      );
    }

    const normalizedEmail = isEmail ? normalizedUsername.toLowerCase() : null;

    const query = isPhone
      ? {
          "user.phone": normalizedUsername,
        }
      : {
          "user.email": normalizedEmail,
        };

    let user = await UserModel.findOne(query);

    let isNewUser = false;

    if (!user) {
      if (isPhone) {
        user = await UserModel.create({
          is_logged_in: false,

          user: {
            phone: normalizedUsername,
            mobile: normalizedUsername,
          },

          is_phone_verified: false,
          is_email_verified: false,
        });
      } else {
        user = await UserModel.create({
          is_logged_in: false,

          user: {
            email: normalizedEmail,
          },

          is_phone_verified: false,
          is_email_verified: false,
        });
      }

      isNewUser = true;
    }

    const existingOtp = await OTPModel.findOne({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    const now = new Date();

    if (existingOtp?.blockedUntil && existingOtp.blockedUntil > now) {
      return Response.json(
        {
          message:
            "به دلیل تلاش‌های ناموفق، موقتاً امکان دریافت کد جدید وجود ندارد.",
          blockedUntil: existingOtp.blockedUntil,
        },
        {
          status: 429,
        },
      );
    }

    const otpPurpose = purpose || "login";

    if (
      existingOtp &&
      existingOtp.expiresAt > now &&
      existingOtp.purpose === otpPurpose
    ) {
      return Response.json(
        {
          success: true,
          message: "کد قبلی هنوز فعال است. لطفا از همان کد استفاده کنید.",
          demoOtp: existingOtp.code,
          expiresAt: existingOtp.expiresAt,
          isNewUser,
          guestCartId,
        },
        {
          status: 200,
        },
      );
    }

    await OTPModel.deleteMany({
      userId: user._id,
    });

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const expiresAt = new Date(Date.now() + OTP_VALIDITY_SECONDS * 1000);

    await OTPModel.create({
      userId: user._id,
      code,
      attempts: 0,
      blockedUntil: null,
      expiresAt,
      purpose: otpPurpose,
    });

    if (isEmail) {
      await sendVerificationEmail(normalizedEmail, code);
    }

    return Response.json(
      {
        success: true,
        message: "OTP generated successfully (demo mode)",
        demoOtp: code,
        expiresAt,
        isNewUser,
        guestCartId,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error("❌ sendCode ERROR");
    console.error(err);

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
