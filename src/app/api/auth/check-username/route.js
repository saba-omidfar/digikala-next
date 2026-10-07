import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { username } = await req.json();

    if (!username) {
      return Response.json(
        {
          success: false,
          message: "نام کاربری الزامی است",
        },
        { status: 400 },
      );
    }

    const normalizedUsername = username.trim().toLowerCase();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedUsername);

    const user = await UserModel.findOne(
      isEmail
        ? { "user.email": normalizedUsername }
        : { "user.phone": normalizedUsername },
    ).select("_id");

    return Response.json({
      success: true,
      exists: !!user,
      isEmail,
    });
  } catch (error) {
    console.error("check username error:", error);

    return Response.json(
      {
        success: false,
        message: "خطایی رخ داد",
      },
      { status: 500 },
    );
  }
}
