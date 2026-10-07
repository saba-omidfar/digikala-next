import crypto from "crypto";
import bcrypt from "bcryptjs";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req) {
  try {
    await dbConnect();

    const { username, resetToken, newPassword, confirmPassword } =
      await req.json();

    if (!username || !resetToken || !newPassword || !confirmPassword) {
      return Response.json(
        {
          success: false,
          message: "اطلاعات لازم برای تغییر رمز کامل نیست.",
        },
        {
          status: 400,
        },
      );
    }

    if (newPassword !== confirmPassword) {
      return Response.json(
        {
          success: false,
          message: "رمزهای عبور یکسان نیستند.",
        },
        {
          status: 400,
        },
      );
    }

    if (newPassword.length < 8) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور باید حداقل ۸ کاراکتر باشد.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/[0-9]/.test(newPassword)) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور باید شامل عدد باشد.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/[!@#$%&*^]/.test(newPassword)) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور باید شامل علامت باشد.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/[a-z]/.test(newPassword)) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور باید شامل حرف کوچک باشد.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/[A-Z]/.test(newPassword)) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور باید شامل حرف بزرگ باشد.",
        },
        {
          status: 400,
        },
      );
    }

    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let query = {};

    if (phoneRegex.test(username)) {
      query = {
        "user.phone": username,
      };
    } else if (emailRegex.test(username)) {
      query = {
        "user.email": username,
      };
    } else {
      return Response.json(
        {
          success: false,
          message: "فرمت شماره همراه یا ایمیل نادرست است.",
        },
        {
          status: 400,
        },
      );
    }

    const user = await UserModel.findOne(query);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد.",
        },
        {
          status: 404,
        },
      );
    }
    if (
      !user.auth?.resetPasswordTokenHash ||
      !user.auth?.resetPasswordTokenExpiresAt
    ) {
      return Response.json(
        {
          success: false,
          message: "درخواست تغییر رمز معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    const now = new Date();

    if (user.auth.resetPasswordTokenExpiresAt <= now) {
      user.auth.resetPasswordTokenHash = null;
      user.auth.resetPasswordTokenExpiresAt = null;

      await user.save();

      return Response.json(
        {
          success: false,
          message: "زمان تغییر رمز عبور به پایان رسیده است.",
          expired: true,
        },
        {
          status: 400,
        },
      );
    }

    const hashedResetToken = hashToken(resetToken);

    if (hashedResetToken !== user.auth.resetPasswordTokenHash) {
      return Response.json(
        {
          success: false,
          message: "توکن تغییر رمز معتبر نیست.",
        },
        {
          status: 401,
        },
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    user.auth.passwordHash = passwordHash;

    user.user.has_password = true;

    user.auth.resetPasswordTokenHash = null;
    user.auth.resetPasswordTokenExpiresAt = null;

    await user.save();

    return Response.json(
      {
        success: true,
        message: "رمز عبور با موفقیت تغییر کرد.",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message || "خطایی در تغییر رمز عبور رخ داد.",
      },
      {
        status: 500,
      },
    );
  }
}
