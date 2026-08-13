// import dbConnect from "@/configs/db";
// import WishlistModel from "@/models/Wishlist";
// import ProductModel from "@/models/Product";

// export async function PUT(req) {
//   try {
//     await dbConnect();

//     const body = await req.json();
//     const { wishlistId, productId } = body;

//     if (!wishlistId || !productId) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "شناسه لیست و محصول الزامی است.",
//         }),
//         { status: 400 }
//       );
//     }

//     const wishlist = await WishlistModel.findById(wishlistId);
//     if (!wishlist)
//       return new Response(
//         JSON.stringify({ success: false, message: "لیست یافت نشد." }),
//         { status: 404 }
//       );

//     const product = await ProductModel.findById(productId);
//     if (!product)
//       return new Response(
//         JSON.stringify({ success: false, message: "محصول یافت نشد." }),
//         { status: 404 }
//       );

//     if (!wishlist.item_product.includes(product._id)) {
//       wishlist.item_product.push(product._id);
//       wishlist.product_on_list = true;
//       wishlist.size = (wishlist.size || 0) + 1;

//       if (product.productImageSrc && product.productImageUrl) {
//         wishlist.product_images.push({
//           imageSrc: product.productImageSrc,
//           imageUrl: product.productImageUrl,
//         });
//       }

//       await wishlist.save();
//     }

//     const updatedWishlist = await WishlistModel.findById(wishlistId).populate(
//       "item_product"
//     );

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "محصول به لیست اضافه شد.",
//         data: updatedWishlist,
//       }),
//       { status: 200 }
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: err.message,
//       }),
//       { status: 500 }
//     );
//   }
// }

import dbConnect from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function PUT(req) {
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

    const user = await UserModel.findOne({ "auth.token": token });
    if (!user) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    const { wishlistId, productId } = await req.json();

    if (!wishlistId || !productId) {
      return Response.json(
        {
          success: false,
          message: "شناسه لیست و محصول الزامی است",
        },
        { status: 400 },
      );
    }

    const wishlist = await WishlistModel.findOne({
      _id: wishlistId,
      userId: user._id,
    });

    if (!wishlist) {
      return Response.json(
        { success: false, message: "لیست یافت نشد" },
        { status: 404 },
      );
    }

    // ❌ جلوگیری از تکرار
    const alreadyExists = wishlist.item_product.some(
      (item) => item.productId === productId,
    );

    if (alreadyExists) {
      return Response.json(
        {
          success: true,
          message: "محصول قبلاً به لیست اضافه شده است",
        },
        { status: 200 },
      );
    }

    // ✅ اضافه کردن محصول
    wishlist.item_product.push({
      productId,
      addedAt: new Date(),
    });

    wishlist.size = wishlist.item_product.length;
    wishlist.product_on_list = true;

    await wishlist.save();

    return Response.json(
      {
        success: true,
        message: "محصول با موفقیت به لیست اضافه شد",
        data: wishlist,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Wishlist PUT error:", err);
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
