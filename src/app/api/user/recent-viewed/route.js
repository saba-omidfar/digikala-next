import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import { digikalaFetch } from "@/lib/digikala";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { productId } = body;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "کاربر لاگین نیست" },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({ "auth.token": token });
    if (!user) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    if (!user?._id || !productId) {
      return Response.json(
        { success: false, message: "شناسه کاربر یا محصول نامعتبر است" },
        { status: 400 },
      );
    }

    if (!Array.isArray(user.viewed_productIds)) {
      user.viewed_productIds = [];
    }

    user.viewed_productIds = user.viewed_productIds.filter(
      (id) => Number(id) !== productId,
    );

    user.viewed_productIds.push(productId);

    if (user.viewed_productIds.length > 20) {
      user.viewed_productIds = user.viewed_productIds.slice(-20);
    }

    await user.save();

    return Response.json(
      {
        success: true,
        message: "محصول به لیست بازدیدها اضافه شد",
        data: user.viewed_productIds,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("POST viewed-products error =>", err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "کاربر لاگین نیست" },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({ "auth.token": token }).lean();
    if (!user) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    const viewedIds = user.viewed_productIds || [];

    if (!viewedIds.length) {
      return Response.json({ success: true, data: [] }, { status: 200 });
    }

    const products = await Promise.all(
      viewedIds.map(async (productId) => {
        if (!productId) return null;
        console.log("productId=>", productId);

        try {
          const path = `/v2/product/${productId}/?_rch=9fd46e644c8e`;

          const data = await digikalaFetch({
            path,
            headers: req.headers,
          });

          return data?.data?.product;
        } catch (err) {
          console.warn("digikalaFetch failed for product:", productId);
          return null;
        }
      }),
    );

    const filteredProducts = products
      ?.filter((product) => !Array.isArray(product?.default_variant))
      .filter(Boolean);

    return Response.json(
      {
        success: true,
        data: filteredProducts,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("GET viewed-products error =>", err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
