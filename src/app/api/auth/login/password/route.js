import crypto from "crypto";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import CartModel from "@/models/Cart";

import generateAccessToken, { generateRefreshToken } from "@/utils/auth";

function hashRefreshToken(accessToken) {
  return crypto.createHash("sha256").update(accessToken).digest("hex");
}

export async function POST(req) {
  try {
    await dbConnect();

    const { username, guestCartId } = await req.json();

    // =========================
    // VALIDATION
    // =========================

    if (!username) {
      return Response.json(
        {
          message: "وارد کردن ایمیل یا شماره همراه اجباری است",
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

    // =========================
    // FIND USER
    // =========================

    let user = await UserModel.findOne(query);

    let isNewUser = false;

    // =========================
    // CREATE USER
    // =========================

    if (!user) {
      if (!emailRegex.test(username)) {
        return Response.json(
          {
            message: "برای ساخت حساب کاربری از ایمیل استفاده کنید.",
          },
          {
            status: 404,
          },
        );
      }

      user = await UserModel.create({
        is_logged_in: true,

        user: {
          email: username,
        },
      });

      isNewUser = true;
    }

    // =========================
    // GENERATE ACCESS TOKEN
    // =========================

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      username,
    });

    // =========================
    // GENERATE REFRESH TOKEN
    // =========================

    const refreshToken = generateRefreshToken();

    const refreshTokenHash = hashRefreshToken(refreshToken);

    // =========================
    // UPDATE AUTH
    // =========================

    user.is_logged_in = true;

    user.auth = {
      accessToken,
      refreshTokenHash,
      accessTokenCreatedAt: new Date(),
      refreshTokenCreatedAt: new Date(),
    };

    await user.save();

    // =========================
    // SET COOKIES
    // =========================

    const cookieStore = await cookies();

    // ACCESS TOKEN
    cookieStore.set("access_accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    // REFRESH TOKEN
    cookieStore.set("refresh_accessToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    // =========================
    // MERGE GUEST CART
    // =========================

    if (guestCartId) {
      const guestCart = await CartModel.findById(guestCartId);

      if (guestCart) {
        let userCart = await CartModel.findOne({
          userId: user._id,
        });

        // -------------------------
        // CREATE USER CART
        // -------------------------

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
        }

        // -------------------------
        // MERGE EXISTING CART
        // -------------------------
        else {
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

          // -------------------------
          // CART ITEMS
          // -------------------------

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

          // -------------------------
          // NEXT CART
          // -------------------------

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
        }

        await userCart.save();

        // -------------------------
        // DELETE GUEST CART
        // -------------------------

        await CartModel.findByIdAndDelete(guestCartId);
      }
    }

    // =========================
    // RESPONSE
    // =========================

    return Response.json(
      {
        success: true,
        message: "User logged in successfully.",
        isNewUser,

        data: {
          id: user._id,
          email: user.user?.email,
          phone: user.user?.phone,
        },

        clearGuestCartId: Boolean(guestCartId),
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error("login error:", err);

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
