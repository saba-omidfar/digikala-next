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

    const {
      address,
      cityId,
      cityName,
      stateId,
      stateName,
      latitude,
      longitude,
    } = body;

    if (!address || !cityId || !cityName || !stateId || !stateName) {
      return Response.json(
        {
          success: false,
          message: "اطلاعات موقعیت ناقص است.",
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

    const newAddress = {
      id: Date.now(),

      name: "موقعیت انتخابی",
      full_name: "",

      address,
      postal_code: "",

      telephone: "",
      mobile: user.user?.mobile || user.user?.phone || "",

      city_id: Number(cityId),
      city_name: cityName,

      state_id: Number(stateId),
      state_name: stateName,

      district_id: null,

      is_default: true,

      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,

      building_number: "",
      unit: "",

      drop_off_address_id: null,

      is_usable: true,
      is_general_location_jet_eligible: true,
      is_accurate: false,

      type: "location",
    };

    if (!user?.is_logged_in.addresses) {
      user.addresses = [];
    }

    user.addresses.forEach((address) => {
      address.is_default = false;
    });

    user.addresses.push(newAddress);

    user.default_address = newAddress;

    await user.save();

    return Response.json({
      success: true,
      addresses: user.addresses,
      default_address: user.default_address,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "ثبت موقعیت با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
