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

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);

    const activeTab = searchParams.get("activeTab") || "announcements";

    const limit = 10;

    const observedProducts = (user.observed_products || []).filter(
      (item) => item.type === "on_incredible_offer",
    );

    const totalItems = observedProducts.length;
    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedObservedProducts = observedProducts.slice(
      startIndex,
      endIndex,
    );

    const products = await Promise.all(
      paginatedObservedProducts.map(async (observe) => {
        try {
          const data = await digikalaFetch({
            path: `/product/v1/products/${observe.productId}/?_rch=9fd46e644c8e`,
          });

          const product = data?.data?.product;

          return {
            id: product.id,
            title_fa: product.title_fa || "",
            title_en: product.title_en || "",
            url: product.url || {},
            status: product.status || "",
            default_variant: product.default_variant,
            has_quick_view: product.has_quick_view || false,
            data_layer: product.data_layer || {},
            product_type: product.product_type || "product",
            test_title_fa: product.test_title_fa || "",
            test_title_en: product.test_title_en || "",
            digiplus: product.digiplus || {},
            images: product.images || {},
            user_reactions: {
              is_observed_on_stock: true,
            },
          };
        } catch (error) {
          console.error(
            `Get observed product ${observe.productId} error:`,
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
        products: validProducts,
        pager: {
          current_page: page,
          total_pages: totalPages,
          total_items: totalItems,
        },
      },
    });
  } catch (err) {
    console.error("Get observed products error:", err);

    return Response.json(
      {
        status: 500,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
