// import mongoose from "mongoose";
// import { cookies } from "next/headers";

// import dbConnect from "@/configs/db";
// import CartModel from "@/models/Cart";
// import UserModel from "@/models/User";

// import recalcCartPrices from "@/utils/recalcCartPrices";
// import syncUserCart from "@/utils/syncUserCart";
// import { digikalaFetch } from "@/lib/digikala";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const cookiesStore = await cookies();
//     const accessToken = cookiesStore.get("access_token")?.value;

//     const {
//       guestCartId = null,
//       productId = null,
//       variantId = null,
//       quantity = 1,
//       hasInsurance = false,
//       fromNextCart = false,
//       moveAll = false,
//     } = await req.json();

//     let cart;

//     const user = await UserModel.findOne({
//       "auth.accessToken": accessToken,
//     }).select("_id");

//     if (user) {
//       cart = await CartModel.findOne({
//         userId: user._id,
//       });
//     } else if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
//       cart = await CartModel.findById(guestCartId);
//     }

//     if (!cart) {
//       cart = await CartModel.create({
//         userId: user?._id || null,
//         packages: [{ cart_items: [] }],
//         next_cart: [],
//       });
//     }

//     const packageRef = cart.packages?.[0];

//     let cartProduct = null;
//     let cartVariant = null;

//     if (fromNextCart && moveAll) {
//       for (const item of cart.next_cart) {
//         const idx = packageRef.cart_items.findIndex(
//           (ci) => Number(ci.variant?.id) === Number(item.variant?.id),
//         );

//         if (idx > -1) {
//           packageRef.cart_items[idx].quantity += item.quantity;
//         } else {
//           packageRef.cart_items.push(item);
//         }
//       }

//       cart.next_cart = [];
//       cart.updatedAt = new Date();

//       recalcCartPrices(cart);
//       await cart.save();

//       if (cart.userId) {
//         const dbUser = await UserModel.findById(cart.userId);
//         if (dbUser) {
//           await syncUserCart(dbUser, cart);
//           await dbUser.save();
//         }
//       }

//       return Response.json({ success: true, cart }, { status: 200 });
//     }

//     if (!fromNextCart && moveAll) {
//       for (const item of packageRef.cart_items) {
//         const idx = cart.next_cart.findIndex(
//           (ci) => Number(ci.variant?.id) === Number(item.variant?.id),
//         );

//         if (idx > -1) {
//           cart.next_cart[idx].quantity += item.quantity;
//         } else {
//           cart.next_cart.push(item);
//         }
//       }

//       packageRef.cart_items = [];
//       cart.updatedAt = new Date();

//       recalcCartPrices(cart);
//       await cart.save();

//       if (cart.userId) {
//         const dbUser = await UserModel.findById(cart.userId);
//         if (dbUser) {
//           await syncUserCart(dbUser, cart);
//           await dbUser.save();
//         }
//       }

//       return Response.json({ success: true, cart }, { status: 200 });
//     }

//     if (fromNextCart) {
//       const nextItem = cart.next_cart.find(
//         (item) => Number(item.variant?.id) === Number(variantId),
//       );

//       if (!nextItem) {
//         return Response.json(
//           { success: false, message: "محصول در خرید بعدی پیدا نشد" },
//           { status: 404 },
//         );
//       }

//       cartProduct = nextItem.product;
//       cartVariant = nextItem.variant;

//       cart.next_cart = cart.next_cart.filter(
//         (item) => Number(item.variant?.id) !== Number(variantId),
//       );
//     } else {
//       const data = await digikalaFetch({
//         path: `/v2/product/${productId}/`,
//       });

//       const product = data?.data?.product;

//       if (!product) {
//         return Response.json(
//           { success: false, message: "محصول پیدا نشد" },
//           { status: 404 },
//         );
//       }

//       const variant =
//         product.variants?.find((v) => Number(v.id) === Number(variantId)) ||
//         product.default_variant;

//       if (!variant) {
//         return Response.json(
//           { success: false, message: "واریانت نامعتبر است" },
//           { status: 400 },
//         );
//       }

//       cartProduct = product;
//       cartVariant = variant;
//     }

//     cart.next_cart = cart.next_cart.filter(
//       (item) => Number(item.variant?.id) !== Number(cartVariant.id),
//     );

//     const existingIndex = packageRef.cart_items.findIndex(
//       (item) => Number(item.variant?.id) === Number(cartVariant.id),
//     );

//     if (existingIndex > -1) {
//       const existingItem = packageRef.cart_items[existingIndex];

//       if (
//         existingItem.quantity + quantity >
//         (cartVariant?.price?.order_limit || Infinity)
//       ) {
//         return Response.json(
//           { success: false, message: "حداکثر تعداد مجاز رسیدی" },
//           { status: 400 },
//         );
//       }

//       existingItem.quantity += quantity;
//       existingItem.has_insurance = Boolean(hasInsurance);
//     } else {
//       packageRef.cart_items.push({
//         id: Math.floor(Math.random() * 1e9),
//         cart_id: cart._id,
//         quantity,
//         product: { ...cartProduct },
//         variant: { ...cartVariant },
//         has_insurance: Boolean(hasInsurance),
//       });
//     }

//     cart.updatedAt = new Date();

//     recalcCartPrices(cart);
//     await cart.save();

//     if (cart.userId) {
//       const dbUser = await UserModel.findById(cart.userId);
//       if (dbUser) {
//         await syncUserCart(dbUser, cart);
//         await dbUser.save();
//       }
//     }

//     return Response.json(
//       { success: true, cart, guestCartId: !user?.id ? cart._id : null },
//       { status: 201 },
//     );
//   } catch (err) {
//     console.error("Cart error:", err);

//     return Response.json(
//       { success: false, message: err.message },
//       { status: 500 },
//     );
//   }
// }

import mongoose from "mongoose";
import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";

import recalcCartPrices from "@/utils/recalcCartPrices";
import syncUserCart from "@/utils/syncUserCart";
import { digikalaFetch } from "@/lib/digikala";

const syncCartWithUser = async (cart) => {
  if (!cart.userId) return;

  const user = await UserModel.findById(cart.userId);

  if (!user) return;

  await syncUserCart(user, cart);
  await user.save();
};

const saveCart = async (cart) => {
  cart.updatedAt = new Date();

  recalcCartPrices(cart);
  await cart.save();

  await syncCartWithUser(cart);
};

const getCart = async ({ user, guestCartId }) => {
  if (user) {
    console.log("🛒 FIND USER CART");

    return CartModel.findOne({
      userId: user._id,
    });
  }

  if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
    console.log("🛒 FIND GUEST CART");

    return CartModel.findById(guestCartId);
  }

  return null;
};

const createCart = async (user) => {
  console.log("🆕 CREATE CART");

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
  console.log("🔵 FETCH DIGIKALA PRODUCT:", {
    productId,
    variantId,
  });

  const data = await digikalaFetch({
    path: `/v2/product/${productId}/`,
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

  console.log("🟢 DIGIKALA PRODUCT FOUND");

  return {
    product,
    variant,
  };
};

export async function POST(req) {
  try {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🟡 CART ADD: START");

    // ─────────────────────────────────────────────
    // DATABASE
    // ─────────────────────────────────────────────

    await dbConnect();

    console.log("🟢 CART ADD: DB CONNECTED");

    // ─────────────────────────────────────────────
    // AUTH
    // ─────────────────────────────────────────────

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    console.log("🔐 ACCESS TOKEN EXISTS:", Boolean(accessToken));

    // ─────────────────────────────────────────────
    // REQUEST BODY
    // ─────────────────────────────────────────────

    const body = await req.json();

    console.log("📦 CART ADD BODY:", body);

    const {
      guestCartId = null,
      productId = null,
      variantId = null,
      quantity = 1,
      hasInsurance = false,
      fromNextCart = false,
      moveAll = false,
    } = body;

    // ─────────────────────────────────────────────
    // USER
    // ─────────────────────────────────────────────

    let user = null;

    if (accessToken) {
      console.log("🔎 FIND USER");

      user = await UserModel.findOne({
        "auth.accessToken": accessToken,
      }).select("_id");

      console.log("👤 USER:", user?._id?.toString() || "USER NOT FOUND");
    } else {
      console.log("👤 GUEST USER → SKIP USER QUERY");
    }

    // ─────────────────────────────────────────────
    // CART
    // ─────────────────────────────────────────────

    let cart = await getCart({
      user,
      guestCartId,
    });

    console.log("🛒 CART FOUND:", Boolean(cart));

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

    // ─────────────────────────────────────────────
    // MOVE NEXT CART → CART
    // ─────────────────────────────────────────────

    if (fromNextCart && moveAll) {
      console.log("🔄 MOVE ALL: NEXT CART → CART");

      moveNextCartToCart(cart);

      await saveCart(cart);

      console.log("🟢 MOVE ALL SUCCESS");

      return Response.json(
        {
          success: true,
          cart,
        },
        { status: 200 },
      );
    }

    // ─────────────────────────────────────────────
    // MOVE CART → NEXT CART
    // ─────────────────────────────────────────────

    if (!fromNextCart && moveAll) {
      console.log("🔄 MOVE ALL: CART → NEXT CART");

      moveCartToNextCart(cart);

      await saveCart(cart);

      console.log("🟢 MOVE ALL SUCCESS");

      return Response.json(
        {
          success: true,
          cart,
        },
        { status: 200 },
      );
    }

    // ─────────────────────────────────────────────
    // PRODUCT / VARIANT
    // ─────────────────────────────────────────────

    let cartProduct;
    let cartVariant;

    if (fromNextCart) {
      console.log("🟣 MOVE PRODUCT FROM NEXT CART");

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

    // ─────────────────────────────────────────────
    // REMOVE FROM NEXT CART
    // ─────────────────────────────────────────────

    cart.next_cart = cart.next_cart.filter(
      (item) => Number(item.variant?.id) !== Number(cartVariant.id),
    );

    // ─────────────────────────────────────────────
    // FIND EXISTING ITEM
    // ─────────────────────────────────────────────

    const existingIndex = packageRef.cart_items.findIndex(
      (item) => Number(item.variant?.id) === Number(cartVariant.id),
    );

    // ─────────────────────────────────────────────
    // UPDATE EXISTING ITEM
    // ─────────────────────────────────────────────

    if (existingIndex > -1) {
      console.log("🛒 EXISTING CART ITEM");

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
    }

    // ─────────────────────────────────────────────
    // ADD NEW ITEM
    // ─────────────────────────────────────────────
    else {
      console.log("➕ ADD NEW CART ITEM");

      packageRef.cart_items.push({
        id: Math.floor(Math.random() * 1e9),
        cart_id: cart._id,
        quantity,
        product: {
          ...cartProduct,
        },
        variant: {
          ...cartVariant,
        },
        has_insurance: Boolean(hasInsurance),
      });
    }

    // ─────────────────────────────────────────────
    // SAVE
    // ─────────────────────────────────────────────

    console.log("💾 SAVE CART");

    await saveCart(cart);

    console.log("🟢 CART ADD SUCCESS");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    return Response.json(
      {
        success: true,
        cart,
        guestCartId: !user?.id ? cart._id : null,
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
