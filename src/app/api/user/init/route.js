import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import GuestLocationModel from "@/models/GuestLocation";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    const guestCartId = req.nextUrl.searchParams.get("guestCartId");

    const guestLocation = guestCartId
      ? await GuestLocationModel.findOne({
          guestCartId,
        }).lean()
      : null;

    if (!accessToken) {
      const guestLocation = guestCartId
        ? await GuestLocationModel.findOne({
            guestCartId,
          }).lean()
        : null;

      const defaultAddress = guestLocation?.default_address || null;

      return Response.json(
        {
          success: true,
          data: {
            is_logged_in: false,
            default_address: defaultAddress || [],
            city: defaultAddress
              ? {
                  id: defaultAddress.city_id,
                  state_id: defaultAddress.state_id,
                  name: defaultAddress.city_name,
                }
              : [],
            social_profile: { is_activated: false },
            cart: {},
          },
        },
        { status: 200 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).lean();

    if (!user?.is_logged_in) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    const defaultAddress =
      user.default_address?.id && user.default_address?.city_id
        ? user.default_address
        : null;

    const city = defaultAddress
      ? {
          id: defaultAddress.city_id,
          state_id: defaultAddress.state_id,
          name: defaultAddress.city_name,
        }
      : user.city || null;

    return Response.json(
      {
        success: true,
        data: {
          is_logged_in: true,

          digiclub: user.digiclub,
          digiplus: user.digiplus,
          notification: user.notification,

          user: user.user,

          default_address: defaultAddress,

          city,

          date_time: user.createdAt,

          social_profile: user.social_profile,

          cart: user.cart || {},
          cart_items: user.cart_items || [],

          favorite_products: user.favorite_products || [],
          observed_products: user.observed_products || [],
        },
      },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
