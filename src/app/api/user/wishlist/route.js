// import dbConnect from "@/configs/db";
// import WishlistModel from "@/models/Wishlist";
// import UserModel from "@/models/User";
// import { cookies } from "next/headers";

// // 🟡 Get All Lists for Current User
// export async function GET() {
//   try {
//     await dbConnect();
//     const cookiesStore = await cookies();
//     const token = cookiesStore.get("token")?.value;

//     if (!token)
//       return Response.json(
//         { success: false, message: "کاربر لاگین نیست" },
//         { status: 401 }
//       );

//     const user = await UserModel.findOne({ "auth.token": token });
//     const userId = user?._id;

//     if (!userId) {
//       return new Response(
//         JSON.stringify({ success: false, message: "کاربر یافت نشد." }),
//         { status: 400 }
//       );
//     }

//     const lists = await WishlistModel.find({ userId })
//       .sort({ createdAt: -1 })
//       .populate("item_product");

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: lists,
//       }),
//       { status: 200 }
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ success: false, message: err.message }),
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import { digikalaFetch } from "@/lib/digikala";

export async function GET() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "کاربر لاگین نیست" },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({ "auth.token": token }).lean();
    if (!user) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    const wishlists = await WishlistModel.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .lean();

    const data = await Promise.all(
      wishlists.map(async (list) => {
        // 🧠 اگر اصلاً محصولی نداره
        if (
          !Array.isArray(list.item_product) ||
          list.item_product.length === 0
        ) {
          return {
            ...list,
            item_product: [],
          };
        }

        // اگر لیست خیلی بزرگ شد
        if (list.item_product.length > 20) {
          list.item_product = list.item_product.slice(0, 20);
        }

        const products = await Promise.all(
          list.item_product?.map(async (item) => {
            if (!item?.productId) return null;

            try {
              const path = `/v2/product/${item?.productId}/?_rch=9fd46e644c8e`;

              const data = await digikalaFetch({
                path,
                headers: req.headers,
              });

              return {
                ...item,
                product: data ?? null,
              };
            } catch (err) {
              console.warn(
                "digikalaFetch failed for product:",
                item?.productId,
              );
              return null;
            }
          }),
        );

        return {
          ...list,
          item_product: products.filter(Boolean),
        };
      }),
    );

    return Response.json(
      {
        success: true,
        data,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Wishlist GET error:", err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
