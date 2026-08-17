import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "کاربر لاگین نیست",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    }).lean();

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر یافت نشد",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        user,
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
