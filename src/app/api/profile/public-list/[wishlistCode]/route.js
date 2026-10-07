import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import WishlistModel from "@/models/Wishlist";

import { digikalaFetch } from "@/lib/digikala";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { wishlistCode } = await params;

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

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const sort = Number(searchParams.get("sort")) || 1;

    const limit = 10;

    const code = wishlistCode;

    const wishlist = await WishlistModel.findOne({
      code,
      userId: user._id,
    }).lean();

    if (!wishlist) {
      return Response.json(
        {
          status: 404,
          message: "لیست پیدا نشد",
        },
        { status: 404 },
      );
    }

    const itemProducts = Array.isArray(wishlist.item_product)
      ? wishlist.item_product
      : [];

    const products = await Promise.all(
      itemProducts.map(async (item, index) => {
        try {
          const response = await digikalaFetch({
            path: `/product/v1/products/${item.productId}/?_rch=9fd46e644c8e`,
          });

          const product = response?.data?.product;

          if (!product) {
            return null;
          }

          return {
            ...product,
            wishlistIndex: index,
          };
        } catch (error) {
          console.error(
            `public list product ${item.productId} error =>`,
            error,
          );

          return null;
        }
      }),
    );

    let sortedProducts = products.filter(Boolean);

    if (sort === 1) {
      sortedProducts.sort((a, b) => b.wishlistIndex - a.wishlistIndex);
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
      .map(({ wishlistIndex, ...product }) => product);

    const publicListUrl = `https://www.digikala.com/wishlist/${wishlist.code}/`;

    const publicList = {
      id: wishlist._id,
      code: wishlist.code,
      title: wishlist.title,
      description: wishlist.description || null,

      share_urls: {
        public_list_url: publicListUrl,

        social_media: {
          whatsapp: {
            url: `https://wa.me?text=${publicListUrl}`,
            title: "واتس اپ",
          },

          twitter: {
            url: `https://twitter.com/intent/tweet?url=${publicListUrl}`,
            title: "توییتر",
          },
        },
      },

      size_list: Array.isArray(wishlist.item_product)
        ? wishlist.item_product.length
        : 0,
    };

    return Response.json({
      status: 200,

      data: {
        public_list: publicList,

        products: paginatedProducts,

        is_user_owner: true,

        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },

        sort,

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

        is_notification_active: true,
      },
    });
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
