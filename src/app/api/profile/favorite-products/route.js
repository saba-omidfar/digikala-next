import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          data: [],
        },
        { status: 200 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
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

    const favoriteProducts = user.favorite_products || [];

    if (!favoriteProducts.length) {
      return Response.json({
        success: true,
        data: [],
      });
    }

    const products = await Promise.all(
      favoriteProducts.map(async (productId) => {
        try {
          const data = await digikalaFetch({
            path: `/v2/product/${productId}/?_rch=9fd46e644c8e`,
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
    console.error("get favorite products error =>", err);

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
