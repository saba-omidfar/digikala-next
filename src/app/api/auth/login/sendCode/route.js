// import { cookies } from "next/headers";

// import dbConnect from "@/configs/db";

// import UserModel from "@/models/User";
// import OTPModel from "@/models/Otp";
// import CartModel from "@/models/Cart";

// import generateToken from "@/utils/auth";
// import recalcCartPrices from "@/utils/recalcCartPrices";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const { username, guestCartId } = await req.json();

//     const guestCart = await CartModel.findById(guestCartId);

//     // VALIDATION
//     if (!username) {
//       return new Response(
//         JSON.stringify({
//           message: "وارد کردن ایمیل یا شماره همراه اجباری است",
//         }),
//         { status: 400 },
//       );
//     }

//     const phoneRegex = /^(\+98|0)?9\d{9}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     let query = {};

//     if (phoneRegex.test(username)) {
//       query = { "user.phone": username };
//     } else if (emailRegex.test(username)) {
//       query = { "user.email": username };
//     } else {
//       return new Response(
//         JSON.stringify({
//           message: "فرمت ورودی نادرست است.",
//         }),
//         { status: 400 },
//       );
//     }

//     // FIND USER
//     let user = await UserModel.findOne(query);

//     let token = "";
//     let isNewUser = false;

//     // CREATE USER
//     if (!user) {
//       if (phoneRegex.test(username)) {
//         token = generateToken({ username });

//         user = await UserModel.create({
//           is_logged_in: true,
//           user: {
//             phone: username,
//             mobile: username,
//           },
//           auth: {
//             token,
//             tokenCreatedAt: new Date(),
//           },
//         });

//         isNewUser = true;
//       } else {
//         return new Response(
//           JSON.stringify({
//             message:
//               "حساب کاربری با مشخصات وارد شده وجود ندارد. لطفا از شماره تلفن همراه برای ساخت حساب کاربری استفاده نمایید.",
//           }),
//           { status: 404 },
//         );
//       }
//     }

//     // LOGIN USER
//     else {
//       token = generateToken({ username });

//       user.is_logged_in = true;

//       user.auth = {
//         token,
//         tokenCreatedAt: new Date(),
//       };

//       await user.save();
//     }

//     // COOKIE
//     const cookieStore = await cookies();

//     await cookieStore.delete("token");

//     await cookieStore.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60,
//     });

//     // =========================
//     // MERGE GUEST CART
//     // =========================

//     if (guestCartId) {
//       const guestCart = await CartModel.findById(guestCartId);

//       if (guestCart) {
//         let userCart = await CartModel.findOne({
//           userId: user._id,
//         });

//         if (!userCart) {
//           userCart = await CartModel.create({
//             userId: user._id,
//             packages: guestCart.packages || [{ cart_items: [] }],
//             next_cart: guestCart.next_cart || [],
//           });
//         } else {
//           if (!userCart.packages?.length) {
//             userCart.packages = [{ cart_items: [] }];
//           }

//           const userItems = userCart.packages[0].cart_items;

//           const guestItems = guestCart.packages?.[0]?.cart_items || [];

//           for (const guestItem of guestItems) {
//             const existingItem = userItems.find(
//               (item) =>
//                 Number(item.variant?.id) === Number(guestItem.variant?.id),
//             );

//             if (existingItem) {
//               existingItem.quantity += guestItem.quantity;
//             } else {
//               userItems.push(guestItem);
//             }
//           }

//           for (const guestNextItem of guestCart.next_cart || []) {
//             const existingNext = userCart.next_cart.find(
//               (item) =>
//                 Number(item.variant?.id) === Number(guestNextItem.variant?.id),
//             );

//             if (existingNext) {
//               existingNext.quantity += guestNextItem.quantity;
//             } else {
//               userCart.next_cart.push(guestNextItem);
//             }
//           }

//           userCart.updatedAt = new Date();

//           recalcCartPrices(userCart);

//           await userCart.save();
//         }

//         await CartModel.findByIdAndDelete(guestCartId);
//       }
//     }

//     // if (guestCartId) {
//     //   const guestCart = await CartModel.findById(guestCartId);

//     //   let userCart = await CartModel.findOne({
//     //     userId: user._id,
//     //   });

//     //   // CREATE USER CART
//     //   if (!userCart) {
//     //     userCart = await CartModel.create({
//     //       userId: user._id,
//     //       packages: guestCart?.packages || [],
//     //     });

//     //     // connect cart to user
//     //     user.cart = userCart._id;

//     //     await user.save();
//     //   }

//     //   // MERGE ITEMS
//     //   else if (guestCart) {
//     //     if (!userCart.packages || !userCart.packages.length) {
//     //       userCart.packages = [{ cart_items: [] }];
//     //     }

//     //     guestCart.packages?.forEach((pkg) => {
//     //       pkg.cart_items?.forEach((item) => {
//     //         const existingItemIndex = userCart.packages[0].cart_items.findIndex(
//     //           (ci) => ci?.variant?.id === item?.variant?.id,
//     //         );

//     //         if (existingItemIndex > -1) {
//     //           userCart.packages[0].cart_items[existingItemIndex].quantity +=
//     //             item.quantity;
//     //         } else {
//     //           userCart.packages[0].cart_items.push(item);
//     //         }
//     //       });
//     //     });

//     //     await userCart.save();

//     //     // sync relation
//     //     if (!user.cart) {
//     //       user.cart = userCart._id;

//     //       await user.save();
//     //     }
//     //   }

//     //   await CartModel.findByIdAndDelete(guestCartId);
//     // }

//     // =========================
//     // OTP
//     // =========================

//     const existingOtp = await OTPModel.findOne({
//       userId: user._id,
//     }).sort({
//       createdAt: -1,
//     });

//     // OTP هنوز معتبره
//     if (existingOtp && existingOtp.expiresAt > new Date()) {
//       return new Response(
//         JSON.stringify({
//           message: "کد قبلی هنوز فعال است. لطفا از همان کد استفاده کنید.",
//           demoOtp: existingOtp.code,
//           isNewUser,
//         }),
//         {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );
//     }

//     // CREATE OTP
//     const code = Math.floor(10000 + Math.random() * 90000).toString();
//     const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

//     await OTPModel.deleteMany({ userId: user._id });
//     await OTPModel.create({
//       userId: user._id,
//       code,
//       attempts: 0,
//       blockedUntil: null,
//       expiresAt,
//     });

//     return new Response(
//       JSON.stringify({
//         message: "OTP generated successfully (demo mode)",
//         demoOtp: code,
//         isNewUser,
//         guestCartId: null,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: err.message,
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   }
// }

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import OTPModel from "@/models/Otp";

export async function POST(req) {
  try {
    await dbConnect();

    const { username, guestCartId } = await req.json();

    // =========================
    // VALIDATION
    // =========================

    if (!username) {
      return new Response(
        JSON.stringify({
          message: "وارد کردن ایمیل یا شماره همراه اجباری است",
        }),
        { status: 400 },
      );
    }

    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let query = {};

    if (phoneRegex.test(username)) {
      query = { "user.phone": username };
    } else if (emailRegex.test(username)) {
      query = { "user.email": username };
    } else {
      return new Response(
        JSON.stringify({
          message: "فرمت ورودی نادرست است.",
        }),
        { status: 400 },
      );
    }

    // =========================
    // FIND / CREATE USER
    // =========================

    let user = await UserModel.findOne(query);

    let isNewUser = false;

    if (!user) {
      if (phoneRegex.test(username)) {
        user = await UserModel.create({
          is_logged_in: false,

          user: {
            phone: username,
            mobile: username,
          },
        });

        isNewUser = true;
      } else {
        return new Response(
          JSON.stringify({
            message:
              "حساب کاربری با مشخصات وارد شده وجود ندارد. لطفا از شماره تلفن همراه برای ساخت حساب کاربری استفاده نمایید.",
          }),
          {
            status: 404,
          },
        );
      }
    }

    // =========================
    // OTP
    // =========================

    const existingOtp = await OTPModel.findOne({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    // OTP هنوز معتبره
    if (existingOtp && existingOtp.expiresAt > new Date()) {
      return new Response(
        JSON.stringify({
          message: "کد قبلی هنوز فعال است. لطفا از همان کد استفاده کنید.",
          demoOtp: existingOtp.code,
          isNewUser,
          guestCartId,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // =========================
    // CREATE OTP
    // =========================

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

    await OTPModel.deleteMany({
      userId: user._id,
    });

    await OTPModel.create({
      userId: user._id,
      code,
      attempts: 0,
      blockedUntil: null,
      expiresAt,
    });

    return new Response(
      JSON.stringify({
        message: "OTP generated successfully (demo mode)",
        demoOtp: code,
        isNewUser,
        guestCartId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
