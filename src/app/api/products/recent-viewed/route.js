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
          status: 401,
          message: "کاربر پیدا نشد",
        },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);

    const productIds = [];

    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("product_ids[")) {
        const id = Number(value);

        if (Number.isFinite(id)) {
          productIds.push(id);
        }
      }
    }

    const recentViewed = user.recent_viewed_products || [];

    let selectedProducts;

    if (productIds.length > 0) {
      const requestedIds = new Set(productIds);

      selectedProducts = recentViewed
        .filter((item) => requestedIds.has(Number(item.productId)))
        .sort((a, b) => new Date(b.viewedAt) - new Date(a.viewedAt));
    } else {
      selectedProducts = [...recentViewed].sort(
        (a, b) => new Date(b.viewedAt) - new Date(a.viewedAt),
      );
    }

    const products = await Promise.all(
      selectedProducts.map(async (item) => {
        try {
          const data = await digikalaFetch({
            path: `/product/v1/products/${item.productId}/?_rch=9fd46e644c8e`,
          });

          return data?.data?.product || null;
        } catch {
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
  } catch (err) {
    console.error("Get recent viewed products error:", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
