import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";

const EXPIRE_DAYS = 30;

export async function GET(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          data: [],
        },
        { status: 200 },
      );
    }

    const user = await UserModel.findOne({
      "auth.token": token,
    }).lean();

    if (!user) {
      return Response.json(
        {
          success: false,
          data: [],
        },
        { status: 200 },
      );
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - EXPIRE_DAYS);

    const viewedProducts = (user.viewed_products || [])
      .filter((item) => new Date(item.viewedAt) > expireDate)
      .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));

    if (!viewedProducts.length) {
      return Response.json({
        success: true,
        data: [],
      });
    }

    const products = await Promise.all(
      viewedProducts.map(async ({ productId }) => {
        try {
          const data = await digikalaFetch({
            path: `/v2/product/${productId}/?_rch=9fd46e644c8e`,
            headers: req.headers,
          });

          return data?.data?.product;
        } catch {
          return null;
        }
      }),
    );

    return Response.json({
      success: true,
      data: products
        .filter((product) => !Array.isArray(product?.default_variant))
        .filter(Boolean),
    });
  } catch (err) {
    console.error("get recent viewed error =>", err);

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
