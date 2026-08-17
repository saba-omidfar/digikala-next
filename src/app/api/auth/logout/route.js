import { NextResponse } from "next/server";
import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "توکن یافت نشد." },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({ "auth.accessToken": accessToken });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد." },
        { status: 404 },
      );
    }

    user.is_logged_in = false;
    user.auth = { accessToken: "", accessTokenCreatedAt: null };
    await user.save();

    const response = NextResponse.json({
      success: true,
      message: "کاربر با موفقیت خارج شد.",
    });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
