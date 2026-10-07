import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function GET(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          data: [],
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
          data: [],
        },
        { status: 200 },
      );
    }

    const digiplus = user.digiplus || [];

    return Response.json({
      success: true,
      data: digiplus,
    });
  } catch (err) {
    console.error("get digiplus error =>", err);

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
