import dbConnect from "@/configs/db";

import ProductFeedbackModel from "@/models/ProductFeedback";
import UserModel from "@/models/User";

import { cookies } from "next/headers";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({
      "auth.token": token,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 401 });
    }

    const existingReport = await ProductFeedbackModel.findOne({
      productId,
      userId: user._id,
    });

    if (existingReport) {
      return Response.json(
        {
          message: "نظر شما قبلا در سیستم ثبت شده است",
        },
        { status: 409 },
      );
    }

    await ProductFeedbackModel.create({
      productId,
      userId: user._id,
    });

    return Response.json({
      success: true,
      message: "گزارش با موفقیت ثبت شد",
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        message: "Internal Server Error",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
