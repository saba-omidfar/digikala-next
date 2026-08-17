// import dbConnect from "@/configs/db";
// import CartModel from "@/models/Cart";
// import UserModel from "@/models/User";
// import { cookies } from "next/headers";

// export async function DELETE(req) {
//   try {
//     await dbConnect();

//     const cookiesStore = await cookies();
//     const accessToken = cookiesStore.get("access_token")?.value;

//     const { searchParams } = new URL(req.url);
//     const guestCartId = searchParams.get("guestCartId") || null;

//     if (accessToken) {
//       const user = await UserModel.findOne({ "auth.accessToken": accessToken });
//       if (!user)
//         return new Response(
//           JSON.stringify({ success: false, message: "کاربر یافت نشد" }),
//           { status: 404 }
//         );

//       const cart = await CartModel.findOne({ userId: user._id });
//       if (!cart)
//         return new Response(
//           JSON.stringify({ success: false, message: "سبد خرید یافت نشد" }),
//           { status: 404 }
//         );

//       // فقط آیتم‌هایی که SavedForNextPurchase نیستن نگه می‌داریم
//       cart.packages = cart.packages.map((pkg) => {
//         pkg.items = pkg.items.filter(
//           (item) => item.save_for_later
//         );
//         return pkg;
//       });

//       await cart.save();

//       return new Response(
//         JSON.stringify({ success: true, message: "سبد خرید پاک شد" }),
//         { status: 200 }
//       );
//     }

//     if (guestCartId) {
//       const cart = await CartModel.findById(guestCartId);
//       if (!cart)
//         return new Response(
//           JSON.stringify({ success: false, message: "سبد خرید یافت نشد" }),
//           { status: 404 }
//         );

//       cart.packages = cart.packages.map((pkg) => {
//         pkg.items = pkg.items.filter(
//           (item) => item.save_for_later
//         );
//         return pkg;
//       });

//       await cart.save();

//       return new Response(
//         JSON.stringify({ success: true, message: "سبد خرید مهمان پاک شد" }),
//         { status: 200 }
//       );
//     }

//     return new Response(
//       JSON.stringify({ success: false, message: "سبد خرید یافت نشد" }),
//       { status: 404 }
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ success: false, message: err.message }),
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/configs/db";
import CartModel from "@/models/Cart";
import UserModel from "@/models/User";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function DELETE(req) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    const { searchParams } = new URL(req.url);
    const guestCartId = searchParams.get("guestCartId");

    let cart = null;

    /* --------------------------------
       1️⃣ پیدا کردن Cart (User / Guest)
    -------------------------------- */
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

      cart = await CartModel.findOne({ userId: user._id });
    } else if (guestCartId && mongoose.Types.ObjectId.isValid(guestCartId)) {
      cart = await CartModel.findById(guestCartId);
    }

    if (!cart) {
      return Response.json(
        { success: false, message: "سبد خرید یافت نشد" },
        { status: 404 },
      );
    }

    /* --------------------------------
       2️⃣ پاک‌سازی آیتم‌ها
       (به جز SaveForLater)
    -------------------------------- */
    cart.packages = cart.packages.map((pkg) => ({
      ...pkg,
      cart_items: pkg.cart_items.filter((item) => item.save_for_later === true),
    }));

    cart.updatedAt = new Date();
    await cart.save();

    /* --------------------------------
       3️⃣ پاسخ
    -------------------------------- */
    return Response.json(
      {
        success: true,
        message: accessToken
          ? "سبد خرید کاربر پاک شد"
          : "سبد خرید مهمان پاک شد",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Clear cart error:", err);

    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
