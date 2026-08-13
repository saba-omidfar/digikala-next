import { cookies } from "next/headers";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({
        is_active: false,
      });
    }

    const user = await UserModel.findOne({
      "auth.token": token,
    });

    const isFavorite =
      user?.favorite_products?.some((id) => String(id) === productId) ?? false;

    return Response.json({
      is_favorite: isFavorite,
    });
  } catch (err) {
    console.error("status favorite error =>", err);

    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
