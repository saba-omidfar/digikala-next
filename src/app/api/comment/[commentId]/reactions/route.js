import dbConnect from "@/configs/db";
import FeedbackModel from "@/models/Feedbacks";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  await dbConnect();

  const { commentId } = params;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  let userId = null;
  if (accessToken) {
    const user = await UserModel.findOne({ "auth.accessToken": accessToken });
    if (user) userId = user._id.toString();
  }

  const [likes, dislikes] = await Promise.all([
    FeedbackModel.countDocuments({ commentId, type: "like" }),
    FeedbackModel.countDocuments({ commentId, type: "dislike" }),
  ]);

  let userLiked = false;
  let userDisliked = false;

  if (userId) {
    const existing = await FeedbackModel.findOne({ commentId, userId });
    if (existing) {
      userLiked = existing.type === "like";
      userDisliked = existing.type === "dislike";
    }
  }

  return Response.json({
    likes,
    dislikes,
    userLiked,
    userDisliked,
  });
}

export async function PATCH(req, { params }) {
  try {
    await dbConnect();

    const { commentId } = params;
    const { type } = await req.json();
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    if (!accessToken)
      return Response.json({ message: "Unauthorized" }, { status: 401 });

    const user = await UserModel.findOne({ "auth.accessToken": accessToken });
    if (!user)
      return Response.json({ message: "کاربر پیدا نشد" }, { status: 401 });

    const userId = user._id.toString();

    const existing = await FeedbackModel.findOne({ commentId, userId });

    if (existing) {
      if (existing.type === type)
        await FeedbackModel.deleteOne({ _id: existing._id });
      else {
        existing.type = type;
        await existing.save();
      }
    } else {
      await FeedbackModel.create({ commentId, userId, type });
    }

    const [likes, dislikes] = await Promise.all([
      FeedbackModel.countDocuments({ commentId, type: "like" }),
      FeedbackModel.countDocuments({ commentId, type: "dislike" }),
    ]);

    const updated = await FeedbackModel.findOne({ commentId, userId });

    return Response.json({
      likes,
      dislikes,
      userLiked: updated?.type === "like" || false,
      userDisliked: updated?.type === "dislike" || false,
    });
  } catch (err) {
    console.error("PATCH /Feedbacks error:", err);
    return Response.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 },
    );
  }
}
