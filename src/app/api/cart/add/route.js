import mongoose from "mongoose";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import { digikalaFetch } from "@/lib/digikala";

import recalcCartPrices from "@/utils/recalcCartPrices";
import syncUserCart from "@/utils/syncUserCart";
import hydrateItems from "@/utils/hydrateCartItems";

const syncCartWithUser = async (cart) => {
  if (!cart.userId) return;

  const user = await UserModel.findById(cart.userId);

  if (!user?.is_logged_in) return;

  await syncUserCart(user, cart);
  await user.save();
};

const saveCart = async (cart) => {
  cart.updatedAt = new Date();

  await cart.save();

  await syncCartWithUser(cart);
};

const getCart = async ({ user, guestCartId }) => {
  if (user) {
    const cart = await CartModel.findOne({
      userId: user._id,
    });

    return cart;
  }

  if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
    const cart = await CartModel.findById(guestCartId);

    return cart;
  }

  return null;
};

const createCart = async (user) => {
  return CartModel.create({
    userId: user?._id || null,
    packages: [{ cart_items: [] }],
    next_cart: [],
  });
};

const moveNextCartToCart = (cart) => {
  const packageRef = cart.packages?.[0];

  if (!packageRef) {
    throw new Error("سبد خرید پکیج ندارد");
  }

  for (const item of cart.next_cart || []) {
    const existingIndex = packageRef.cart_items.findIndex(
      (cartItem) => Number(cartItem.variant?.id) === Number(item.variant?.id),
    );

    if (existingIndex > -1) {
      packageRef.cart_items[existingIndex].quantity += item.quantity;
    } else {
      packageRef.cart_items.push(item);
    }
  }

  cart.next_cart = [];
};

const moveCartToNextCart = (cart) => {
  const packageRef = cart.packages?.[0];

  if (!packageRef) {
    throw new Error("سبد خرید پکیج ندارد");
  }

  for (const item of packageRef.cart_items) {
    const existingIndex = cart.next_cart.findIndex(
      (nextItem) => Number(nextItem.variant?.id) === Number(item.variant?.id),
    );

    if (existingIndex > -1) {
      cart.next_cart[existingIndex].quantity += item.quantity;
    } else {
      cart.next_cart.push(item);
    }
  }

  packageRef.cart_items = [];
};

const getProductAndVariant = async ({ productId, variantId }) => {
  const data = await digikalaFetch({
    path: `/product/v1/products/${productId}/`,
  });

  const product = data?.data?.product;

  if (!product) {
    throw new Error("محصول پیدا نشد");
  }

  const variant =
    product.variants?.find((item) => Number(item.id) === Number(variantId)) ||
    product.default_variant;

  if (!variant) {
    throw new Error("واریانت نامعتبر است");
  }

  return {
    product,
    variant,
  };
};

export async function POST(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    const body = await req.json();

    const {
      guestCartId = null,
      productId = null,
      variantId = null,
      quantity = 1,
      hasInsurance = false,
      fromNextCart = false,
      moveAll = false,
    } = body;

    let user = null;

    if (accessToken) {
      user = await UserModel.findOne({
        "auth.accessToken": accessToken,
      }).select("_id");
    }

    let cart = await getCart({
      user,
      guestCartId,
    });

    if (!cart) {
      cart = await createCart(user);
    }

    const packageRef = cart.packages?.[0];

    if (!packageRef) {
      return Response.json(
        {
          success: false,
          message: "ساختار سبد خرید نامعتبر است",
        },
        { status: 500 },
      );
    }

    if (fromNextCart && moveAll) {
      moveNextCartToCart(cart);

      await saveCart(cart);

      return Response.json(
        {
          success: true,
          cart,
        },
        { status: 200 },
      );
    }

    if (!fromNextCart && moveAll) {
      moveCartToNextCart(cart);

      await saveCart(cart);

      return Response.json(
        {
          success: true,
          cart,
        },
        { status: 200 },
      );
    }

    let cartProduct;
    let cartVariant;

    if (fromNextCart) {
      const nextItem = cart.next_cart.find(
        (item) => Number(item.variant?.id) === Number(variantId),
      );

      if (!nextItem) {
        return Response.json(
          {
            success: false,
            message: "محصول در خرید بعدی پیدا نشد",
          },
          { status: 404 },
        );
      }

      cartProduct = nextItem.product;
      cartVariant = nextItem.variant;

      cart.next_cart = cart.next_cart.filter(
        (item) => Number(item.variant?.id) !== Number(variantId),
      );
    } else {
      const result = await getProductAndVariant({
        productId,
        variantId,
      });

      cartProduct = result.product;
      cartVariant = result.variant;
    }

    cart.next_cart = cart.next_cart.filter(
      (item) => Number(item.variant?.id) !== Number(cartVariant.id),
    );

    const existingIndex = packageRef.cart_items.findIndex(
      (item) => Number(item.variant?.id) === Number(cartVariant.id),
    );

    if (existingIndex > -1) {
      const existingItem = packageRef.cart_items[existingIndex];

      const orderLimit = cartVariant?.price?.order_limit || Infinity;

      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > orderLimit) {
        return Response.json(
          {
            success: false,
            message: "حداکثر تعداد مجاز رسیدی",
          },
          { status: 400 },
        );
      }

      existingItem.quantity = newQuantity;
      existingItem.has_insurance = Boolean(hasInsurance);
    } else {
      packageRef.cart_items.push({
        id: Math.floor(Math.random() * 1e9),
        cart_id: cart._id.toString(),
        quantity,
        product: {
          id: cartProduct.id,
        },
        variant: {
          id: cartVariant.id,
        },
        has_insurance: Boolean(hasInsurance),
      });
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

    await saveCart(cart);
    return Response.json(
      {
        success: true,
        cart: responseCart,
        guestCartId: !user ? cart._id.toString() : null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("\n❌ CART ADD ERROR:", error);

    console.error("❌ CART ADD ERROR MESSAGE:", error.message);

    console.error("❌ CART ADD ERROR STACK:", error.stack);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
