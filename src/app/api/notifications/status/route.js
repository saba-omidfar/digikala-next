// import dbConnect from "@/configs/db";
// import UserModel from "@/models/User";
// import { cookies } from "next/headers";

// import AmazingNotification from "@/models/AmazingNotifications";

// export async function GET(req) {
//   try {
//     await dbConnect();

//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value || null;

//     if (!token) {
//       return Response.json(
//         {
//           success: false,
//           message: "کاربر احراز هویت نشده است",
//         },
//         { status: 401 }
//       );
//     }

//     const { searchParams } = new URL(req.url);
//     const productId = searchParams.get("productId");

//     const user = await UserModel.findOne({
//       "auth.token": token,
//     });

//     if (!user?._id || !productId) {
//       return new Response(JSON.stringify({ message: "Missing params" }), {
//         status: 400,
//       });
//     }

//     const existingNotification = await AmazingNotification.findOne({
//       userId: user?._id,
//       productId,
//     });

//     if (!existingNotification) {
//       return new Response(
//         JSON.stringify({
//           success: true,
//           isActive: false,
//           channels: {},
//         }),
//         { status: 200 }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({
//           success: true,
//           isActive: true,
//           channels: existingNotification.channels,
//         }),
//         { status: 200 }
//       );
//     }
//   } catch (err) {
//     return new Response(JSON.stringify({ message: err.message }), {
//       status: 500,
//     });
//   }
// }

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import AmazingNotification from "@/models/AmazingNotifications";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        { success: false, message: "کاربر احراز هویت نشده است" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return Response.json(
        { success: false, message: "productId ارسال نشده" },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).lean();

    if (!user?._id) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    const notification = await AmazingNotification.findOne({
      userId: user._id,
      productId: Number(productId),
    }).lean();

    if (!notification) {
      return Response.json(
        { success: true, isActive: false, channels: {} },
        { status: 200 },
      );
    }

    return Response.json(
      {
        success: true,
        isActive: true,
        channels: notification.channels,
      },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
