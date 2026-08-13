import dbConnect from "@/configs/db";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await dbConnect();

    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token)
      return Response.json(
        { success: false, message: "کاربر لاگین نیست" },
        { status: 401 },
      );

    const user = await UserModel.findOne({ "auth.token": token });
    if (!user)
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );

    return Response.json({ success: true, user }, { status: 200 });
  } catch (err) {
    return Response.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
