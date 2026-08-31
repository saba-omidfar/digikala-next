import { NextResponse } from "next/server";
import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (accessToken) {
      const user = await UserModel.findOne({
        "auth.accessToken": accessToken,
      });

      if (user) {
        user.is_logged_in = false;

        user.auth = {
          accessToken: "",
          accessTokenCreatedAt: null,
        };

        await user.save();
      }
    }

    const response = NextResponse.json({
      success: true,
      message: "کاربر با موفقیت خارج شد.",
    });

    response.cookies.set("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (err) {
    return NextResponse.json(
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
