// app/api/comments/[commentId]/report/route.js

import dbConnect from "@/configs/db";

import CommentReportModel from "@/models/CommentReport";
import UserModel from "@/models/User";

import { cookies } from "next/headers";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { commentId } = params;

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 401 });
    }

    const existingReport = await CommentReportModel.findOne({
      commentId,
      userId: user._id,
    });

    if (existingReport) {
      return Response.json(
        {
          message: "قبلا این دیدگاه را گزارش کرده‌اید",
        },
        { status: 409 },
      );
    }

    await CommentReportModel.create({
      commentId,
      userId: user._id,
    });

    return Response.json({
      success: true,
      message: "گزارش با موفقیت ثبت شد",
    });
  } catch (err) {
    console.error("POST /report error:", err);

    return Response.json(
      {
        message: "Internal Server Error",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
