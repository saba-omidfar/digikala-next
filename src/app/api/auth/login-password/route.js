import crypto from "crypto";
import { cookies } from "next/headers";

import bcrypt from "bcryptjs";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import CartModel from "@/models/Cart";
import GuestLocationModel from "@/models/GuestLocation";

import generateAccessToken, { generateRefreshToken } from "@/utils/auth";

import recalcCartPrices from "@/utils/recalcCartPrices";

function hashRefreshToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req) {
  try {
    await dbConnect();

    const { username, password, guestCartId } = await req.json();

    if (!username || !password) {
      return Response.json(
        {
          success: false,
          message: "نام کاربری و رمز عبور الزامی است.",
        },
        { status: 400 },
      );
    }

    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let query = {};

    if (phoneRegex.test(username)) {
      query = { "user.phone": username };
    } else if (emailRegex.test(username)) {
      query = { "user.email": username.toLowerCase() };
    } else {
      return Response.json(
        {
          success: false,
          message: "شماره موبایل یا ایمیل معتبر نیست.",
        },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne(query);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربری با این مشخصات پیدا نشد.",
        },
        { status: 404 },
      );
    }

    if (!user.auth?.passwordHash) {
      return Response.json(
        {
          success: false,
          message: "برای این حساب هنوز رمز عبور تعیین نشده است.",
        },
        { status: 400 },
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.auth.passwordHash,
    );

    if (!isPasswordValid) {
      return Response.json(
        {
          success: false,
          message: "رمز عبور اشتباه است.",
        },
        { status: 401 },
      );
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      username,
    });

    const refreshToken = generateRefreshToken();
    const refreshTokenHash = hashRefreshToken(refreshToken);

    user.is_logged_in = true;

    user.auth.accessToken = accessToken;
    user.auth.refreshTokenHash = refreshTokenHash;
    user.auth.accessTokenCreatedAt = new Date();
    user.auth.refreshTokenCreatedAt = new Date();

    await user.save();

    const cookiesStore = await cookies();

    cookiesStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    cookiesStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    if (guestCartId) {
      const guestLocation = await GuestLocationModel.findOne({
        guestCartId,
      });

      if (guestLocation?.default_address) {
        user.default_address = guestLocation.default_address;

        if (guestLocation.default_address.city_id) {
          user.city = {
            id: guestLocation.default_address.city_id,
            name: guestLocation.default_address.city_name,
          };
        }
      }
    }

    await user.save();

    if (guestCartId) {
      const guestCart = await CartModel.findOne({
        guestCartId,
      });

      if (guestCart) {
        let userCart = await CartModel.findOne({
          userId: user._id,
        });

        if (!userCart) {
          guestCart.userId = user._id;
          guestCart.guestCartId = null;

          await guestCart.save();

          userCart = guestCart;
        } else {
          for (const guestItem of guestCart.items || []) {
            const existingItem = userCart.items.find(
              (item) =>
                String(item.productId) === String(guestItem.productId) &&
                String(item.variantId || "") ===
                  String(guestItem.variantId || ""),
            );

            if (existingItem) {
              existingItem.quantity += guestItem.quantity;
            } else {
              userCart.items.push(guestItem);
            }
          }

          await userCart.save();

          await CartModel.deleteOne({
            _id: guestCart._id,
          });
        }

        await recalcCartPrices(userCart);
      }

      await GuestLocationModel.deleteOne({
        guestCartId,
      });
    }

    return Response.json(
      {
        success: true,
        message: "ورود با موفقیت انجام شد.",
        user: {
          id: user._id,
          phone: user.user?.phone,
          email: user.user?.email,
        },
        clearGuestCartId: Boolean(guestCartId),
      },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: "خطایی در ورود رخ داد.",
      },
      { status: 500 },
    );
  }
}
