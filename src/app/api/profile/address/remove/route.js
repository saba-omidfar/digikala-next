import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر وارد نشده است.",
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    const { id } = body;

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "شناسه آدرس ارسال نشده است.",
        },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user?.is_logged_in) {
      return Response.json(
        {
          success: false,
          message: "کاربر پیدا نشد.",
        },
        { status: 404 },
      );
    }

    if (!user?.addresses?.length) {
      return Response.json(
        {
          success: false,
          message: "آدرسی برای حذف وجود ندارد.",
        },
        { status: 404 },
      );
    }

    const addressIndex = user.addresses.findIndex(
      (address) => Number(address.id) === Number(id),
    );

    if (addressIndex === -1) {
      return Response.json(
        {
          success: false,
          message: "آدرس موردنظر پیدا نشد.",
        },
        { status: 404 },
      );
    }

    const removedAddress = user.addresses[addressIndex];

    user.addresses.splice(addressIndex, 1);

    if (removedAddress.is_default) {
      if (user.addresses.length > 0) {
        user.addresses[0].is_default = true;
        user.default_address = user.addresses[0];
      } else {
        user.default_address = undefined;
      }
    }

    await user.save();

    return Response.json({
      success: true,
      message: "آدرس با موفقیت حذف شد.",
      addresses: user.addresses,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "حذف آدرس با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
