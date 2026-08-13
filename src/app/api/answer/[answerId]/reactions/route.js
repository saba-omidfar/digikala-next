import dbConnect from "@/configs/db";
import FeedbackModel from "@/models/Feedbacks";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  await dbConnect();

  const { answerId } = params;

  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  let userId = null;
  if (token) {
    const user = await UserModel.findOne({ "auth.token": token });
    if (user) userId = user._id.toString();
  }

  const [likes, dislikes] = await Promise.all([
    FeedbackModel.countDocuments({
      targetId: answerId,
      targetType: "answer",
      type: "like",
    }),
    FeedbackModel.countDocuments({
      targetId: answerId,
      targetType: "answer",
      type: "dislike",
    }),
  ]);

  let userFeedback = null;

  if (userId) {
    const existing = await FeedbackModel.findOne({
      targetId: answerId,
      targetType: "answer",
      userId,
    });
    userFeedback = existing?.type || null;
  }

  return Response.json({
    likes,
    dislikes,
    userFeedback,
  });
}

export async function PATCH(req, { params }) {
  await dbConnect();

  const { answerId } = params;
  const { type } = await req.json();

  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const user = await UserModel.findOne({ "auth.token": token });
  if (!user)
    return Response.json({ message: "User not found" }, { status: 401 });

  const userId = user._id.toString();

  const existing = await FeedbackModel.findOne({
    targetId: answerId,
    targetType: "answer",
    userId,
  });

  if (existing) {
    if (existing.type === type) {
      await FeedbackModel.deleteOne({ _id: existing._id });
    } else {
      existing.type = type;
      await existing.save();
    }
  } else {
    await FeedbackModel.create({
      targetId: answerId,
      targetType: "answer",
      userId,
      type,
    });
  }

  const [likes, dislikes] = await Promise.all([
    FeedbackModel.countDocuments({
      targetId: answerId,
      targetType: "answer",
      type: "like",
    }),
    FeedbackModel.countDocuments({
      targetId: answerId,
      targetType: "answer",
      type: "dislike",
    }),
  ]);

  const updated = await FeedbackModel.findOne({
    targetId: answerId,
    targetType: "answer",
    userId,
  });

  return Response.json({
    likes,
    dislikes,
    userFeedback: updated?.type || null,
  });
}
