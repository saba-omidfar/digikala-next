import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر احراز هویت نشده است",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const productId = String(body?.productId || "").trim();

    if (!productId) {
      return Response.json(
        {
          success: false,
          message: "شناسه محصول ارسال نشده است",
        },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    if (!Array.isArray(user.favorite_products)) {
      user.favorite_products = [];
    }

    const normalizedFavorites = user.favorite_products.map(String);
    const isFavorited = normalizedFavorites.includes(productId);

    let action;
    let message;

    if (isFavorited) {
      user.favorite_products = user.favorite_products.filter(
        (id) => String(id) !== productId,
      );
      action = "remove";
      message = "محصول از لیست علاقه‌مندی‌ها حذف شد";
    } else {
      user.favorite_products.push(productId);
      action = "add";
      message = "محصول به علاقه‌مندی‌ها اضافه شد";
    }

    await user.save();

    return Response.json(
      {
        success: true,
        action,
        message,
        favorites: user.favorite_products,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("toggle favorite error =>", err);

    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر احراز هویت نشده است",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).select("favorite_products");

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    const products = await Promise.all(
      user.favorite_products?.map(async (productId) => {
        try {
          const path = `/v2/product/${productId}/?_rch=9fd46e644c8e`;

          const data = await digikalaFetch({
            path,
          });

          return data.data.product;
        } catch (err) {
          console.warn("digikalaFetch failed for product:", productId);
          return null;
        }
      }),
    );

    return Response.json(
      {
        success: true,
        products: products || [],
      },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
