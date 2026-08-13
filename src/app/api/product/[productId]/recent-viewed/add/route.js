import { cookies } from "next/headers";

import dbConnect from "@/configs/db";
import UserModel from "@/models/User";

const MAX_ITEMS = 15;
const EXPIRE_DAYS = 30;

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json(
        { success: false, message: "کاربر لاگین نیست" },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.token": token,
    });

    if (!user) {
      return Response.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    if (!Array.isArray(user.viewed_products)) {
      user.viewed_products = [];
    }

    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - EXPIRE_DAYS);

    // حذف آیتم‌های منقضی شده
    user.viewed_products = user.viewed_products.filter(
      (item) => new Date(item.viewedAt) > expireDate,
    );

    // حذف اگر قبلا وجود داشته
    user.viewed_products = user.viewed_products.filter(
      (item) => Number(item.productId) !== Number(productId),
    );

    // افزودن جدید
    user.viewed_products.push({
      productId: Number(productId),
      viewedAt: new Date(),
    });

    // نگه داشتن آخرین 15 مورد
    user.viewed_products = user.viewed_products.slice(-MAX_ITEMS);

    await user.save();

    return Response.json({
      success: true,
      message: "محصول به بازدیدهای اخیر اضافه شد",
    });
  } catch (err) {
    console.error("add recent viewed error =>", err);

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
