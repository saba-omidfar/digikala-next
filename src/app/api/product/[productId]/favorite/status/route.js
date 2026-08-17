import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json({
        is_favorite: false,
      });
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).lean();

    const isFavorite =
      user?.favorite_products?.some((id) => String(id) === String(productId)) ??
      false;

    return Response.json({
      is_favorite: isFavorite,
    });
  } catch (err) {
    console.error("status favorite error =>", err);

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
