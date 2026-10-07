import crypto from "crypto";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import OTPModel from "@/models/Otp";
import CartModel from "@/models/Cart";
import GuestLocationModel from "@/models/GuestLocation";

import generateAccessToken, { generateRefreshToken } from "@/utils/auth";

import recalcCartPrices from "@/utils/recalcCartPrices";

const OTP_MAX_ATTEMPTS = 5;
const OTP_BLOCK_SECONDS = 5 * 60;

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
          message: "ایمیل یا شماره همراه و کد تایید الزامی است.",
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

    let query = {};

    if (isPhone) {
      query = {
        "user.phone": normalizedUsername,
      };
    } else {
      query = {
        "user.email": normalizedEmail,
      };
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

    const now = new Date();

    if (otpRecord.blockedUntil && otpRecord.blockedUntil > now) {
      return Response.json(
        {
          message: "به دلیل تلاش‌های ناموفق، موقتاً امکان ورود وجود ندارد.",
          blockedUntil: otpRecord.blockedUntil,
        },
        {
          status: 429,
        },
      );
    }

    if (otpRecord.expiresAt <= now) {
      await OTPModel.deleteMany({
        userId: user._id,
      });

      return Response.json(
        {
          message: "کد تایید منقضی شده است. لطفاً کد جدید دریافت کنید.",
          expired: true,
        },
        {
          status: 400,
        },
      );
    }

    if (String(otpRecord.code) !== String(code)) {
      otpRecord.attempts = (otpRecord.attempts || 0) + 1;

      if (otpRecord.attempts >= OTP_MAX_ATTEMPTS) {
        otpRecord.blockedUntil = new Date(
          Date.now() + OTP_BLOCK_SECONDS * 1000,
        );
      }

      await otpRecord.save();

      return Response.json(
        {
          message:
            otpRecord.attempts >= OTP_MAX_ATTEMPTS
              ? "تعداد تلاش‌های مجاز تمام شده است."
              : "کد تایید اشتباه است.",
          attempts: otpRecord.attempts,
        },
        {
          status: 400,
        },
      );
    }

    if (isPhone) {
      user.is_phone_verified = true;
    }

    if (isEmail) {
      user.is_email_verified = true;
    }

    await OTPModel.deleteMany({
      userId: user._id,
    });

    let guestLocation = null;

    if (guestCartId) {
      guestLocation = await GuestLocationModel.findOne({
        guestCartId,
      }).lean();
    }

    if (otpRecord.purpose === "reset_password") {
      const resetToken = crypto.randomBytes(32).toString("hex");

      const resetTokenHash = hashRefreshToken(resetToken);

      user.auth.resetPasswordTokenHash = resetTokenHash;

      user.auth.resetPasswordTokenExpiresAt = new Date(
        Date.now() + 10 * 60 * 1000,
      );

      await user.save();

      return Response.json({
        success: true,
        message: "کد تایید صحیح است.",
        resetPassword: true,
        resetToken,
      });
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      username: normalizedUsername,
    });

    const refreshToken = generateRefreshToken();

    const refreshTokenHash = hashRefreshToken(refreshToken);

    user.is_logged_in = true;

    user.auth.accessToken = accessToken;
    user.auth.refreshTokenHash = refreshTokenHash;
    user.auth.accessTokenCreatedAt = new Date();
    user.auth.refreshTokenCreatedAt = new Date();

    if (guestLocation?.default_address) {
      const guestAddress = guestLocation.default_address;

      const currentAddresses = Array.isArray(user.addresses)
        ? user.addresses
        : [];

      const alreadyExists = currentAddresses.some(
        (address) => Number(address.id) === Number(guestAddress.id),
      );

      if (!alreadyExists) {
        user.addresses = [...currentAddresses, guestAddress];
      }

      user.default_address = guestAddress;
    }

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

      if (guestLocation?.default_address) {
        await GuestLocationModel.deleteOne({
          guestCartId,
        });
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
