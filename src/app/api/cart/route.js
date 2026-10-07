import { cookies } from "next/headers";
import mongoose from "mongoose";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";
import recalcCartPrices from "@/utils/recalcCartPrices";

async function hydrateItems(items = []) {
  if (!items?.length) return [];

  const hydrated = await Promise.all(
    items.map(async (item) => {
      try {
        const productId = item.product?.id;
        const variantId = item.variant?.id;

        if (!productId || !variantId) {
          return {
            ...item,
            unavailable: true,
          };
        }

        const data = await digikalaFetch({
          path: `/product/v1/products/${productId}/`,
        });

        const product = data?.data?.product;

        if (!product) {
          return {
            ...item,
            unavailable: true,
          };
        }

        const variant =
          product.variants?.find((v) => Number(v.id) === Number(variantId)) ||
          (Number(product.default_variant?.id) === Number(variantId)
            ? product.default_variant
            : null);

        if (!variant) {
          return {
            ...item,
            unavailable: true,
          };
        }

        return {
          ...item,

          unavailable: false,

          product,

          variant,

          price: {
            selling_price: variant.price?.selling_price ?? 0,
            rrp_price: variant.price?.rrp_price ?? 0,
            order_limit: variant.price?.order_limit ?? null,
            discount_percent: variant.price?.discount_percent ?? 0,
            is_incredible: variant.price?.is_incredible ?? false,
            is_promotion: variant.price?.is_promotion ?? false,
            timer: variant.price?.timer ?? null,
          },
        };
      } catch (error) {
        console.error("HYDRATE ITEM ERROR:", error);

        return {
          ...item,
          unavailable: true,
        };
      }
    }),
  );

  return hydrated;
}

const toStoredItem = (item) => ({
  product: {
    id: item.product?.id,
  },
  variant: {
    id: item.variant?.id,
  },
  quantity: Number(item.quantity) || 1,
  has_insurance: Boolean(item.has_insurance),
  is_next_cart_button_available: item.is_next_cart_button_available ?? true,
  e_gift_card_properties: item.e_gift_card_properties ?? null,
});

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    const { searchParams } = new URL(req.url);
    const guestCartId = searchParams.get("guestCartId");

    let cart = null;
    let clearGuestCartId = false;

    if (accessToken) {
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

      cart = await CartModel.findOne({
        userId: user._id,
      });

      if (!cart) {
        cart = await CartModel.create({
          userId: user._id,
          packages: [{ cart_items: [] }],
          next_cart: [],
        });
      }

      if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
        const guestCart = await CartModel.findById(guestCartId);

        if (guestCart) {
          const packageRef = cart.packages?.[0];

          if (!packageRef) {
            cart.packages = [{ cart_items: [] }];
          }

          const userItems = cart.packages[0].cart_items || [];
          const guestItems = guestCart.packages?.[0]?.cart_items || [];

          for (const guestItem of guestItems) {
            const existingIndex = userItems.findIndex(
              (item) =>
                Number(item.variant?.id) === Number(guestItem.variant?.id),
            );

            if (existingIndex > -1) {
              userItems[existingIndex].quantity += guestItem.quantity;
            } else {
              userItems.push(guestItem);
            }
          }

          cart.packages[0].cart_items = userItems;

          const userNextCart = cart.next_cart || [];
          const guestNextCart = guestCart.next_cart || [];

          for (const guestItem of guestNextCart) {
            const existingIndex = userNextCart.findIndex(
              (item) =>
                Number(item.variant?.id) === Number(guestItem.variant?.id),
            );

            if (existingIndex > -1) {
              userNextCart[existingIndex].quantity += guestItem.quantity;
            } else {
              userNextCart.push(guestItem);
            }
          }

          cart.next_cart = userNextCart;

          await cart.save();
          await guestCart.deleteOne();

          clearGuestCartId = true;
        }
      }

      const rawCart = cart.toObject();

      const [cartItems, nextCart] = await Promise.all([
        hydrateItems(rawCart.packages?.[0]?.cart_items || []),
        hydrateItems(rawCart.next_cart || []),
      ]);

      const responseCart = {
        ...rawCart,

        packages: (rawCart.packages || []).map((pkg, index) => ({
          ...pkg,
          cart_items: index === 0 ? cartItems : pkg.cart_items || [],
        })),

        next_cart: nextCart,
      };

      recalcCartPrices(responseCart);

      cart.items_count = responseCart.items_count;
      cart.payable_price = responseCart.payable_price;
      cart.rrp_price = responseCart.rrp_price;
      cart.rrp_price_total = responseCart.rrp_price_total;
      cart.items_discount = responseCart.items_discount;
      cart.total_discount = responseCart.total_discount;
      cart.insurance = responseCart.insurance;

      await cart.save();

      return Response.json({
        success: true,
        cart: responseCart,
        clearGuestCartId,
      });
    }

    if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
      cart = await CartModel.findById(guestCartId);
    }

    if (!cart) {
      return Response.json({
        success: true,
        cart: null,
      });
    }

    const rawCart = cart.toObject();

    const [cartItems, nextCart] = await Promise.all([
      hydrateItems(rawCart.packages?.[0]?.cart_items || []),
      hydrateItems(rawCart.next_cart || []),
    ]);

    const responseCart = {
      ...rawCart,

      packages: (rawCart.packages || []).map((pkg, index) => ({
        ...pkg,
        cart_items: index === 0 ? cartItems : pkg.cart_items || [],
      })),

      next_cart: nextCart,
    };

    recalcCartPrices(responseCart);

    cart.items_count = responseCart.items_count;
    cart.payable_price = responseCart.payable_price;
    cart.rrp_price = responseCart.rrp_price;
    cart.rrp_price_total = responseCart.rrp_price_total;
    cart.items_discount = responseCart.items_discount;
    cart.total_discount = responseCart.total_discount;
    cart.insurance = responseCart.insurance;

    await cart.save();

    return Response.json({
      success: true,
      cart: responseCart,
    });
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
