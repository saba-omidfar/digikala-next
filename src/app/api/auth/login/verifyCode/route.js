import crypto from "crypto";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import OTPModel from "@/models/Otp";
import CartModel from "@/models/Cart";

import generateAccessToken, { generateRefreshToken } from "@/utils/auth";

import recalcCartPrices from "@/utils/recalcCartPrices";

function hashRefreshToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req) {
  try {
    await dbConnect();

    const { username, code, guestCartId } = await req.json();

    if (!username || !code) {
      return Response.json(
        {
          message: "شماره همراه و کد تایید الزامی است.",
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
          message: "فرمت ورودی نادرست است.",
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
          message: "کاربر یافت نشد.",
        },
        {
          status: 404,
        },
      );
    }

    const otpRecord = await OTPModel.findOne({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    if (!otpRecord) {
      return Response.json(
        {
          message: "کد تاییدی برای این کاربر وجود ندارد.",
        },
        {
          status: 400,
        },
      );
    }

    if (otpRecord.blockedUntil && otpRecord.blockedUntil > new Date()) {
      return Response.json(
        {
          message: "به دلیل تلاش‌های ناموفق، موقتاً امکان ورود وجود ندارد.",
        },
        {
          status: 429,
        },
      );
    }

    if (otpRecord.expiresAt <= new Date()) {
      await OTPModel.deleteMany({
        userId: user._id,
      });

      return Response.json(
        {
          message: "کد تایید منقضی شده است. لطفاً کد جدید دریافت کنید.",
        },
        {
          status: 400,
        },
      );
    }

    if (String(otpRecord.code) !== String(code)) {
      otpRecord.attempts = (otpRecord.attempts || 0) + 1;

      if (otpRecord.attempts >= 5) {
        otpRecord.blockedUntil = new Date(Date.now() + 5 * 60 * 1000);
      }

      await otpRecord.save();

      return Response.json(
        {
          message:
            otpRecord.attempts >= 5
              ? "تعداد تلاش‌های مجاز تمام شده است."
              : "کد تایید اشتباه است.",
          attempts: otpRecord.attempts,
        },
        {
          status: 400,
        },
      );
    }

    await OTPModel.deleteMany({
      userId: user._id,
    });

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      username,
    });

    const refreshToken = generateRefreshToken();

    const refreshTokenHash = hashRefreshToken(refreshToken);

    user.is_logged_in = true;

    user.auth = {
      accessToken,
      refreshTokenHash,
      accessTokenCreatedAt: new Date(),
      refreshTokenCreatedAt: new Date(),
    };

    await user.save();

    const cookiesStore = await cookies();

    cookiesStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    cookiesStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    if (guestCartId) {
      const guestCart = await CartModel.findById(guestCartId);

      if (guestCart) {
        let userCart = await CartModel.findOne({
          userId: user._id,
        });

        if (!userCart) {
          userCart = await CartModel.create({
            userId: user._id,
            packages: guestCart.packages || [
              {
                cart_items: [],
              },
            ],
            next_cart: guestCart.next_cart || [],
          });

          recalcCartPrices(userCart);

          await userCart.save();
        } else {
          if (!userCart.packages?.length) {
            userCart.packages = [
              {
                cart_items: [],
              },
            ];
          }

          if (!userCart.packages[0].cart_items) {
            userCart.packages[0].cart_items = [];
          }

          if (!userCart.next_cart) {
            userCart.next_cart = [];
          }

          const userItems = userCart.packages[0].cart_items;

          const guestItems = guestCart.packages?.[0]?.cart_items || [];

          for (const guestItem of guestItems) {
            const existingItem = userItems.find(
              (item) =>
                Number(item.variant?.id) === Number(guestItem.variant?.id),
            );

            if (existingItem) {
              existingItem.quantity += guestItem.quantity;
            } else {
              userItems.push(guestItem);
            }
          }

          for (const guestNextItem of guestCart.next_cart || []) {
            const existingNext = userCart.next_cart.find(
              (item) =>
                Number(item.variant?.id) === Number(guestNextItem.variant?.id),
            );

            if (existingNext) {
              existingNext.quantity += guestNextItem.quantity;
            } else {
              userCart.next_cart.push(guestNextItem);
            }
          }

          userCart.updatedAt = new Date();

          recalcCartPrices(userCart);

          await userCart.save();
        }

        await CartModel.findByIdAndDelete(guestCartId);
      }
    }

    return Response.json({
      success: true,
      message: "کد تایید صحیح است و ورود با موفقیت انجام شد.",
      user: {
        id: user._id,
        phone: user.user?.phone,
        email: user.user?.email,
      },
      clearGuestCartId: Boolean(guestCartId),
    });
  } catch (err) {
    console.error("❌ verifyCode ERROR");
    console.error("name:", err?.name);
    console.error("message:", err?.message);
    console.error("stack:", err?.stack);

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
