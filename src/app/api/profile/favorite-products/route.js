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
    }).lean();

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

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const sort = Number(searchParams.get("sort")) || 1;

    const limit = 10;

    const favoriteProducts = Array.isArray(user.favorite_products)
      ? user.favorite_products
      : [];

    const products = await Promise.all(
      favoriteProducts.map(async (productId, index) => {
        try {
          const response = await digikalaFetch({
            path: `/product/v1/products/${productId}/?_rch=9fd46e644c8e`,
          });

          const product = response?.data?.product;

          if (!product) {
            return null;
          }

          return {
            ...product,
            favoriteIndex: index,
          };
        } catch (error) {
          return null;
        }
      }),
    );

    let sortedProducts = products.filter(Boolean);

    if (sort === 1) {
      sortedProducts.sort((a, b) => b.favoriteIndex - a.favoriteIndex);
    }

    if (sort === 21) {
      sortedProducts.sort((a, b) => {
        const priceA = a?.default_variant?.price?.selling_price || 0;

        const priceB = b?.default_variant?.price?.selling_price || 0;

        return priceB - priceA;
      });
    }

    if (sort === 20) {
      sortedProducts.sort((a, b) => {
        const priceA = a?.default_variant?.price?.selling_price || 0;

        const priceB = b?.default_variant?.price?.selling_price || 0;

        return priceA - priceB;
      });
    }

    const totalItems = sortedProducts.length;

    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    const skip = (page - 1) * limit;

    const paginatedProducts = sortedProducts
      .slice(skip, skip + limit)
      .map(({ favoriteIndex, ...product }) => product);

    return Response.json({
      status: 200,

      data: {
        products: paginatedProducts,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },

        sort_options: [
          {
            id: 1,
            title_fa: "جدیدترین",
          },
          {
            id: 21,
            title_fa: "گران‌ترین",
          },
          {
            id: 20,
            title_fa: "ارزان‌ترین",
          },
        ],

        sort,

        is_notification_active: false,
      },
    });
  } catch (err) {
    console.error("get favorite products error =>", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
