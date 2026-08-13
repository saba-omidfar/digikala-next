import dbConnect from "@/configs/db";

import PriceFeedbackModel from "@/models/PriceFeedback";
import UserModel from "@/models/User";

import { cookies } from "next/headers";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { productId } = await params;

    const body = await req.json();

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

    const existingReport = await PriceFeedbackModel.findOne({
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

    const payload = {
      productId,
      userId: user._id,

      competitorPrice: Number(body.competitorPrice),
      isOnlineStore: body.isOnlineStore,
      onlineStoreUrl: body.isOnlineStore ? body.onlineStoreUrl || "" : "",
      physicalStoreName: !body.isOnlineStore
        ? body.physicalStoreName || ""
        : "",
      physicalStoreStateId: !body.isOnlineStore
        ? body.physicalStoreStateId || null
        : null,
    };

    await PriceFeedbackModel.create(payload);

    return Response.json({
      success: true,
      message: "گزارش با موفقیت ثبت شد",
    });
  } catch (err) {
    console.error("POST /price-feedback error:", err);

    return Response.json(
      {
        message: "Internal Server Error",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
