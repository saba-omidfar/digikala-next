import mongoose from "mongoose";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import OrderModel from "@/models/Order";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";

import recalcCartPrices from "@/utils/recalcCartPrices";
import syncUserCart from "@/utils/syncUserCart";
import hydrateItems from "@/utils/hydrateCartItems";

export async function POST(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "برای خرید مجدد ابتدا وارد حساب کاربری شوید",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
      is_logged_in: true,
    }).select("_id");

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر احراز هویت نشد",
        },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return Response.json(
        {
          success: false,
          message: "شناسه سفارش ارسال نشده است",
        },
        { status: 400 },
      );
    }

    let order = await OrderModel.findOne({
      order_code: String(orderId),
      userId: user._id,
    });

    if (!order && mongoose.Types.ObjectId.isValid(String(orderId))) {
      order = await OrderModel.findOne({
        _id: orderId,
        userId: user._id,
      });
    }

    if (!order) {
      return Response.json(
        {
          success: false,
          message: "سفارش پیدا نشد",
        },
        { status: 404 },
      );
    }

    if (!order.items?.length) {
      return Response.json(
        {
          success: false,
          message: "این سفارش کالایی برای خرید مجدد ندارد",
        },
        { status: 400 },
      );
    }

    let cart = await CartModel.findOne({
      userId: user._id,
    });

    if (!cart) {
      cart = await CartModel.create({
        userId: user._id,
        packages: [{ cart_items: [] }],
        next_cart: [],
      });
    }

    if (!cart.packages?.[0]) {
      cart.packages.push({ cart_items: [] });
    }

    const packageRef = cart.packages[0];

    const addedItems = [];
    const unavailableItems = [];
    const limitedItems = [];

    for (const orderItem of order.items) {
      const productId = Number(orderItem.product?.id);
      const variantId = Number(orderItem.variant?.id);
      const quantity = Math.max(1, Number(orderItem.quantity) || 1);

      if (!productId || !variantId) {
        unavailableItems.push({
          title: orderItem.product?.title_fa || "کالای نامشخص",
          reason: "اطلاعات محصول یا واریانت معتبر نیست",
        });

        continue;
      }

      let product;
      let variant;

      try {
        const response = await digikalaFetch({
          path: `/product/v1/products/${productId}/`,
        });

        product = response?.data?.product;

        variant = product?.variants?.find(
          (item) => Number(item.id) === variantId,
        );

        if (!product || !variant) {
          unavailableItems.push({
            title: orderItem.product?.title_fa || "کالای سفارش",
            reason: "محصول یا واریانت قبلی دیگر در دسترس نیست",
          });

          continue;
        }

        if (variant.status && variant.status !== "marketable") {
          unavailableItems.push({
            title: product.title_fa || orderItem.product?.title_fa,
            reason: "این واریانت در حال حاضر قابل خرید نیست",
          });

          continue;
        }

        if (
          variant.is_available === false ||
          variant.stock === 0 ||
          variant.price?.selling_price <= 0
        ) {
          unavailableItems.push({
            title: product.title_fa || orderItem.product?.title_fa,
            reason: "این واریانت در حال حاضر موجود نیست",
          });

          continue;
        }
      } catch (error) {
        console.error("REORDER PRODUCT ERROR:", productId, error.message);

        unavailableItems.push({
          title: orderItem.product?.title_fa || "کالای سفارش",
          reason: "بررسی موجودی این کالا امکان‌پذیر نشد",
        });

        continue;
      }

      const orderLimit = Number(variant.price?.order_limit) || Infinity;

      const existingItem = packageRef.cart_items.find(
        (item) => Number(item.variant?.id) === variantId,
      );

      const currentQuantity = existingItem?.quantity || 0;
      const allowedQuantity = Math.max(
        0,
        Math.min(quantity, orderLimit - currentQuantity),
      );

      if (allowedQuantity <= 0) {
        limitedItems.push({
          productId,
          variantId,
          reason: "حداکثر تعداد مجاز این کالا در سبد خرید ثبت شده است",
        });

        continue;
      }

      cart.next_cart = (cart.next_cart || []).filter(
        (item) => Number(item.variant?.id) !== variantId,
      );

      if (existingItem) {
        existingItem.quantity += allowedQuantity;
      } else {
        packageRef.cart_items.push({
          id: Math.floor(Math.random() * 1e9),
          cart_id: cart._id.toString(),
          quantity: allowedQuantity,
          product: {
            id: product.id,
          },
          variant: {
            id: variant.id,
          },
          has_insurance: Boolean(orderItem.has_insurance),
        });
      }

      addedItems.push({
        productId,
        variantId,
        quantity: allowedQuantity,
      });

      if (allowedQuantity < quantity) {
        limitedItems.push({
          productId,
          variantId,
          requestedQuantity: quantity,
          addedQuantity: allowedQuantity,
          reason: "تعداد اضافه‌شده به سقف مجاز محدود شد",
        });
      }
    }

    if (addedItems.length === 0) {
      return Response.json(
        {
          success: false,
          message: "هیچ‌کدام از کالاهای سفارش قابل افزودن نبودند",
          addedItems,
          unavailableItems,
          limitedItems,
        },
        { status: 400 },
      );
    }

    const responseCart = cart.toObject();

    const hydratedItems = await hydrateItems(
      responseCart.packages?.[0]?.cart_items || [],
    );

    responseCart.packages[0].cart_items = hydratedItems;

    recalcCartPrices(responseCart);

    cart.items_count = responseCart.items_count;
    cart.payable_price = responseCart.payable_price;
    cart.rrp_price = responseCart.rrp_price;
    cart.rrp_price_total = responseCart.rrp_price_total;
    cart.items_discount = responseCart.items_discount;
    cart.total_discount = responseCart.total_discount;
    cart.insurance = responseCart.insurance;

    cart.updatedAt = new Date();

    await cart.save();

    await syncUserCart(user, cart);
    await user.save();

    return Response.json(
      {
        success: true,
        message: "کالاهای قابل خرید به سبد خرید اضافه شدند",
        cart: responseCart,
        addedItems,
        unavailableItems,
        limitedItems,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("REORDER ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "خرید مجدد با خطا مواجه شد",
      },
      { status: 500 },
    );
  }
}
