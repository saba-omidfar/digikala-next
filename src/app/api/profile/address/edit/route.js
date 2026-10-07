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
      id,
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

    if (!id) {
      return Response.json(
        {
          success: false,
          message: "شناسه آدرس ارسال نشده است.",
        },
        { status: 400 },
      );
    }

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

    if (!user?.addresses?.length) {
      return Response.json(
        {
          success: false,
          message: "آدرسی برای ویرایش وجود ندارد.",
        },
        { status: 404 },
      );
    }

    const addressIndex = user.addresses.findIndex(
      (item) => Number(item.id) === Number(id),
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

    const oldAddress = user.addresses[addressIndex];

    user.addresses[addressIndex] = {
      ...oldAddress.toObject?.(),
      id: oldAddress.id,

      name,
      full_name: fullName || "",

      address,
      postal_code: postalCode,

      telephone: telephone || "",
      mobile: mobile || "",

      city_id: Number(cityId),
      city_name: cityName,

      state_id: Number(stateId),
      state_name: stateName,

      district_id: oldAddress.district_id || null,
      support_fmcg: oldAddress.support_fmcg ?? false,

      is_default: oldAddress.is_default ?? false,

      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,

      building_number: buildingNumber || "",
      unit: unit || "",

      drop_off_address_id: oldAddress.drop_off_address_id || null,

      is_usable: true,
      is_general_location_jet_eligible: true,
      is_accurate: true,

      type: "address",
    };

    if (oldAddress.is_default) {
      user.default_address = user.addresses[addressIndex];
    }

    await user.save();

    return Response.json({
      success: true,
      message: "آدرس با موفقیت ویرایش شد.",
      address: user.addresses[addressIndex],
      addresses: user.addresses,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "ویرایش آدرس با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
