import { cookies } from "next/headers";
import mongoose from "mongoose";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";

async function hydrateItems(items = []) {
  if (!items?.length) return [];

  const hydrated = await Promise.all(
    items.map(async (item) => {
      try {
        const data = await digikalaFetch({
          path: `/v2/product/${item.product.id}/`,
        });

        const product = data?.data?.product;

        if (!product) {
          return null;
        }

        const variant = product.variants?.find(
          (v) => Number(v.id) === Number(item.variant.id),
        );

        if (!variant) {
          return null;
        }

        return {
          ...item,

          unavailable: false,

          product: {
            ...product,
            title_fa: product.title_fa,
            images: product.images,
            url: product.url,
            variants: product.variants,
          },

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
        console.error(error);
        return null;
      }
    }),
  );

  return hydrated.filter(Boolean);
}

export async function GET(req) {
  try {
    await dbConnect();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🟡 CART GET: START");

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    const { searchParams } = new URL(req.url);
    const guestCartId = searchParams.get("guestCartId");

    console.log("🍪 ACCESS TOKEN:", Boolean(accessToken));
    console.log("🛒 GUEST CART ID FROM URL:", guestCartId);
    console.log(
      "🆔 VALID OBJECT ID:",
      guestCartId ? mongoose.Types.ObjectId.isValid(guestCartId) : false,
    );

    let cart = null;
    let clearGuestCartId = false;

    /* ---------------- USER ---------------- */
    if (accessToken) {
      const user = await UserModel.findOne({
        "auth.accessToken": accessToken,
      }).select("_id");

      if (!user) {
        return Response.json(
          { success: false, message: "کاربر یافت نشد" },
          { status: 404 },
        );
      }

      cart = await CartModel.findOne({
        userId: user._id,
      }).lean();

      if (!cart) {
        const createdCart = await CartModel.create({
          userId: user._id,
          packages: [{ cart_items: [] }],
          next_cart: [],
        });

        cart = createdCart.toObject();
      }

      /* merge guest */
      if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
        const guestCart = await CartModel.findById(guestCartId);

        if (guestCart) {
          const userItems = cart.packages?.[0]?.cart_items || [];
          const guestItems = guestCart.packages?.[0]?.cart_items || [];

          for (const g of guestItems) {
            const ex = userItems.find(
              (i) => Number(i.variant?.id) === Number(g.variant?.id),
            );

            if (ex) ex.quantity += g.quantity;
            else userItems.push(g);
          }

          cart.packages[0].cart_items = userItems;

          cart.next_cart = [
            ...(cart.next_cart || []),
            ...(guestCart.next_cart || []),
          ];

          await guestCart.deleteOne();
          clearGuestCartId = true;
        }
      }

      const [cartItems, nextCart] = await Promise.all([
        hydrateItems(cart.packages?.[0]?.cart_items),
        hydrateItems(cart.next_cart),
      ]);

      if (
        cartItems.length !== cart.packages?.[0]?.cart_items.length ||
        nextCart.length !== cart.next_cart.length
      ) {
        await CartModel.updateOne(
          { _id: cart._id },
          {
            $set: {
              "packages.0.cart_items": cartItems.map((item) => ({
                product: {
                  id: item.product.id,
                },
                variant: {
                  id: item.variant.id,
                },
                quantity: item.quantity,
                insurance: item.insurance,
              })),
              next_cart: nextCart.map((item) => ({
                product: item.product,
                variant: item.variant,
                quantity: item.quantity,
                insurance: item.insurance,
              })),
            },
          },
        );
      }

      const responseCart = {
        ...cart,

        packages: cart.packages.map((pkg, index) => ({
          ...pkg,
          cart_items: index === 0 ? cartItems : pkg.cart_items,
        })),

        next_cart: nextCart,
      };

      return Response.json({
        success: true,
        cart: responseCart,
        clearGuestCartId,
      });
    }

    /* ---------------- GUEST ---------------- */

    if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
      console.log("🔎 FIND CART BY ID:", guestCartId);

      cart = await CartModel.findById(guestCartId).lean();

      console.log("🛒 CART FOUND:", Boolean(cart), cart?._id?.toString());
    } else {
      console.log("❌ NO VALID GUEST CART ID");
    }

    if (!cart) {
      return Response.json({ success: true, cart: null });
    }

    const [cartItems, nextCart] = await Promise.all([
      hydrateItems(cart.packages?.[0]?.cart_items),
      hydrateItems(cart.next_cart),
    ]);

    if (
      cartItems.length !== cart.packages?.[0]?.cart_items?.length ||
      nextCart.length !== cart.next_cart?.length
    ) {
      await CartModel.updateOne(
        { _id: cart._id },
        {
          $set: {
            "packages.0.cart_items": cartItems.map((item) => ({
              product: {
                id: item.product.id,
              },
              variant: {
                id: item.variant.id,
              },
              quantity: item.quantity,
              insurance: item.insurance,
            })),
            next_cart: nextCart.map((item) => ({
              product: item.product,
              variant: item.variant,
              quantity: item.quantity,
              insurance: item.insurance,
            })),
          },
        },
      );
    }

    const responseCart = {
      ...cart,

      packages: cart.packages.map((pkg, index) => ({
        ...pkg,
        cart_items: index === 0 ? cartItems : pkg.cart_items,
      })),

      next_cart: nextCart,
    };

    return Response.json({
      success: true,
      cart: responseCart,
    });
  } catch (err) {
    console.error("GET cart error =>", err);

    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
