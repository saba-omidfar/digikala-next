// import dbConnect from "@/configs/db";
// import UserModel from "@/models/User";
// import generateToken from "@/utils/auth";

// export async function POST(req) {
//   try {
//     await dbConnect();

//     const body = await req.json();
//     const { username, guestCartId } = body;

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
//     let updateUser = {};

//     if (phoneRegex.test(username)) query = { "user.phone": username };
//     else if (emailRegex.test(username)) query = { "user.email": username };
//     else
//       return new Response(
//         JSON.stringify({ message: "فرمت ورودی نادرست است." }),
//         { status: 400 },
//       );

//     let user = await UserModel.findOne(query);
//     let token = "";
//     let isNewUser = false;

//     if (!user) {
//       if (emailRegex.test(username)) {
//         token = generateToken({ username });
//         user = await UserModel.create({
//           is_logged_in: true,
//           user: { email: username },
//           auth: { token, tokenCreatedAt: new Date() },
//         });
//         isNewUser = true;
//       }
//     } else {
//       if (!user.is_logged_in || !user.auth?.token) {
//         token = generateToken({ username });
//         user.is_logged_in = true;
//         user.auth = { token, tokenCreatedAt: new Date() };
//         await user.save();
//       } else {
//         token = user.auth.token;
//       }

//       updateUser = user;
//     }

//     if (guestCartId) {
//       const guestCart = await CartModel.findById(guestCartId);
//       let userCart = await CartModel.findOne({ userId: user._id });

//       if (!userCart) {
//         userCart = await CartModel.create({
//           cartId: Date.now(),
//           userId: user._id,
//           packages: guestCart?.packages || [],
//         });
//       } else if (guestCart) {
//         // اضافه کردن آیتم‌های مهمان به سبد کاربر
//         guestCart.packages?.forEach((pkg) => {
//           pkg.cart_items.forEach((item) => {
//             // اگر محصول موجود بود، تعدادش رو اضافه کن
//             const existingItemIndex = userCart.packages[0].cart_items.findIndex(
//               (ci) => ci.variant?.variantId === item.variant?.id,
//             );
//             if (existingItemIndex > -1) {
//               userCart.packages[0].cart_items[existingItemIndex].quantity +=
//                 item.quantity;
//             } else {
//               userCart.packages[0].cart_items.push(item);
//             }
//           });
//         });
//       }

//       await userCart.save();
//       await CartModel.findByIdAndDelete(guestCartId);
//     }

//     return new Response(
//       JSON.stringify({
//         message: "User LoggedIn Successfully.",
//         data: updateUser,
//         token,
//         guestCartId: null,
//       }),
//       { status: 200 },
//     );
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ message: err.message }, { status: 500 }),
//     );
//   }
// }

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import CartModel from "@/models/Cart";
import generateToken from "@/utils/auth";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { username, guestCartId } = body;

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
    let updateUser = {};
    let token = "";
    let isNewUser = false;

    // VALIDATION
    if (phoneRegex.test(username)) {
      query = { "user.phone": username };
    } else if (emailRegex.test(username)) {
      query = { "user.email": username };
    } else {
      return new Response(
        JSON.stringify({ message: "فرمت ورودی نادرست است." }),
        { status: 400 },
      );
    }

    // FIND USER
    let user = await UserModel.findOne(query);

    // ======================
    // CREATE USER
    // ======================
    if (!user) {
      if (emailRegex.test(username)) {
        token = generateToken({ username });

        user = await UserModel.create({
          is_logged_in: true,
          user: {
            email: username,
          },
          auth: {
            token,
            tokenCreatedAt: new Date(),
          },
        });

        isNewUser = true;
      } else {
        return new Response(
          JSON.stringify({
            message: "برای ساخت حساب کاربری از ایمیل استفاده کنید.",
          }),
          { status: 404 },
        );
      }
    }

    // ======================
    // LOGIN USER
    // ======================
    else {
      if (!user.is_logged_in || !user.auth?.token) {
        token = generateToken({ username });

        user.is_logged_in = true;
        user.auth = {
          token,
          tokenCreatedAt: new Date(),
        };

        await user.save();
      } else {
        token = user.auth.token;
      }

      updateUser = user;
    }

    // ======================
    // MERGE GUEST CART
    // ======================
    if (guestCartId) {
      const guestCart = await CartModel.findById(guestCartId);

      let userCart = await CartModel.findOne({
        userId: user._id,
      });

      if (!userCart) {
        userCart = await CartModel.create({
          userId: user._id,
          packages: guestCart?.packages || [],
        });
      } else if (guestCart) {
        if (!userCart.packages || !userCart.packages.length) {
          userCart.packages = [{ cart_items: [] }];
        }

        guestCart.packages?.forEach((pkg) => {
          pkg.cart_items?.forEach((item) => {
            const existingItemIndex = userCart.packages[0].cart_items.findIndex(
              (ci) => ci?.variant?.id === item?.variant?.id,
            );

            if (existingItemIndex > -1) {
              userCart.packages[0].cart_items[existingItemIndex].quantity +=
                item.quantity;
            } else {
              userCart.packages[0].cart_items.push(item);
            }
          });
        });
      }

      await userCart.save();
      await CartModel.findByIdAndDelete(guestCartId);
    }

    return new Response(
      JSON.stringify({
        message: "User LoggedIn Successfully.",
        data: updateUser,
        token,
        guestCartId: null,
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: err.message,
      }),
      { status: 500 },
    );
  }
}
