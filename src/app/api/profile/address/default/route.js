import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function PATCH(req) {
  try {
    await dbConnect();

    const { addressId } = await req.json();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر وارد نشده است",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user?.is_logged_in) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    const address = user.addresses.find(
      (item) => String(item.id) === String(addressId),
    );

    if (!address) {
      return Response.json(
        {
          success: false,
          message: "آدرس پیدا نشد",
        },
        { status: 404 },
      );
    }

    user.addresses.forEach((item) => {
      item.is_default = String(item.id) === String(addressId);
    });

    user.default_address = address;

    user.city = {
      id: address.city_id,
      state_id: address.state_id,
      name: address.city_name,
    };

    await user.save();

    return Response.json({
      success: true,
      data: {
        default_address: user.default_address,
        city: user.city,
      },
    });
  } catch (error) {
    console.error("SET DEFAULT ADDRESS ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
