import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";

const EXPIRE_DAYS = 30;

export async function GET() {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          status: 401,
          message: "کاربر وارد نشده است",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user?.is_logged_in) {
      return Response.json(
        {
          status: 404,
          message: "کاربر پیدا نشد",
        },
        { status: 404 },
      );
    }

    if (!Array.isArray(user.recent_viewed_products)) {
      return Response.json({
        status: 200,
        data: {
          recent_viewed_products: {
            title: "بازدیدهای اخیر",
            discount_percent: null,
            see_more_url: null,
            products: [],
            background: null,
            icon: null,
            products_count: null,
            data_layer: null,
          },
        },
      });
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - EXPIRE_DAYS);

    const recentViewedProducts = user.recent_viewed_products.filter(
      (item) => new Date(item.viewedAt) > expireDate,
    );

    const products = await Promise.all(
      recentViewedProducts
        .slice()
        .reverse()
        .map(async (item) => {
          try {
            const data = await digikalaFetch({
              path: `/product/v1/products/${item.productId}/?_rch=9fd46e644c8e`,
            });

            const product = data?.data?.product;

            if (!product) return null;

            return product;
          } catch (error) {
            console.error(
              `Get recent viewed product ${item.productId} error:`,
              error,
            );

            return null;
          }
        }),
    );

    const validProducts = products.filter(Boolean);

    return Response.json({
      status: 200,
      data: {
        recent_viewed_products: {
          title: "بازدیدهای اخیر",
          discount_percent: null,
          see_more_url: null,
          products: validProducts,
          background: null,
          icon: null,
          products_count: null,
          data_layer: null,
        },
      },
    });
  } catch (error) {
    console.error("Get recent viewed products error:", error);

    return Response.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
