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
      name,
      fullName,
      address,
      postalCode,
      telephone,
      mobile,
      cityId,
      cityName,
      stateId,
      stateName,
      latitude,
      longitude,
      buildingNumber,
      unit,
    } = body;

    if (
      !name ||
      !address ||
      !postalCode ||
      !cityId ||
      !cityName ||
      !stateId ||
      !stateName
    ) {
      return Response.json(
        {
          success: false,
          message: "اطلاعات آدرس ناقص است.",
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

    const addressId = Date.now();

    const newAddress = {
      id: addressId,

      name,
      full_name: fullName || "",

      address,
      postal_code: postalCode,

      telephone: telephone || "",
      mobile: mobile || user.user.mobile || user.user.phone || "",

      city_id: Number(cityId),
      city_name: cityName,

      state_id: Number(stateId),
      state_name: stateName,

      district_id: null,

      is_default: true,

      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,

      building_number: buildingNumber || "",
      unit: unit || "",

      drop_off_address_id: null,

      is_usable: true,
      is_general_location_jet_eligible: true,
      is_accurate: true,

      type: "address",
    };

    if (!user?.addresses) {
      user.addresses = [];
    }

    user.addresses.forEach((address) => {
      address.is_default = false;
    });

    user.addresses.push(newAddress);

    user.default_address = newAddress;

    console.log(
      user.addresses.map((address) => ({
        id: address.id,
        name: address.name,
        is_default: address.is_default,
      })),
    );

    await user.save();

    return Response.json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "ثبت آدرس با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
