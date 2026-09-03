import dbConnect from "@/configs/db";
import FeedbackModel from "@/models/Feedbacks";
import UserModel from "@/models/User";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  await dbConnect();

  const { targetId, targetType } = await params;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  let userId = null;

  if (accessToken) {
    const user = await UserModel.findOne({ "auth.accessToken": accessToken });
    if (user) userId = user._id.toString();
  }

  const [likes, dislikes] = await Promise.all([
    FeedbackModel.countDocuments({
      targetId: Number(targetId),
      targetType,
      type: "like",
    }),
    FeedbackModel.countDocuments({
      targetId: Number(targetId),
      targetType,
      type: "dislike",
    }),
  ]);

  let userLiked = false;
  let userDisliked = false;

  if (userId) {
    const existing = await FeedbackModel.findOne({
      targetId: Number(targetId),
      targetType,
      userId,
    });

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

// export async function PATCH(req, { params }) {
//   try {
//     await dbConnect();

//     const { targetId, targetType } = await params;
//     const { type } = await req.json();

//     const cookiesStore = await cookies();
//     const accessToken = cookiesStore.get("access_token")?.value;

//     if (!accessToken)
//       return Response.json({ message: "Unauthorized" }, { status: 401 });

//     const user = await UserModel.findOne({ "auth.accessToken": accessToken });
//     if (!user)
//       return Response.json({ message: "کاربر پیدا نشد" }, { status: 401 });

//     const userId = user._id.toString();

//     const query = {
//       targetId: Number(targetId),
//       targetType,
//       userId,
//     };

//     const existing = await FeedbackModel.findOne(query);

//     if (existing) {
//       if (existing.type === type) {
//         await FeedbackModel.deleteOne({ _id: existing._id });
//       } else {
//         existing.type = type;
//         await existing.save();
//       }
//     } else {
//       await FeedbackModel.create({
//         ...query,
//         type,
//       });
//     }

//     const [likes, dislikes] = await Promise.all([
//       FeedbackModel.countDocuments({
//         targetId: Number(targetId),
//         targetType,
//         type: "like",
//       }),
//       FeedbackModel.countDocuments({
//         targetId: Number(targetId),
//         targetType,
//         type: "dislike",
//       }),
//     ]);

//     const updated = await FeedbackModel.findOne(query);

//     return Response.json({
//       likes,
//       dislikes,
//       userLiked: updated?.type === "like" || false,
//       userDisliked: updated?.type === "dislike" || false,
//     });
//   } catch (err) {
//     console.error("PATCH /Feedbacks error:", err);
//     return Response.json(
//       { message: "Internal Server Error", error: err.message },
//       { status: 500 },
//     );
//   }
// }

export async function PATCH(req, { params }) {
  try {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🟡 FEEDBACK PATCH: START");

    await dbConnect();

    console.log("🟢 FEEDBACK: DB CONNECTED");

    const { targetId, targetType } = await params;

    console.log("🎯 TARGET:", {
      targetId,
      targetType,
    });

    const body = await req.json();

    console.log("📦 BODY:", body);

    const { type } = body;

    if (!["like", "dislike"].includes(type)) {
      return Response.json(
        {
          success: false,
          message: "نوع بازخورد نامعتبر است",
        },
        { status: 400 },
      );
    }

    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get("access_token")?.value;

    console.log("🍪 ACCESS TOKEN EXISTS:", Boolean(accessToken));

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const user = await UserModel.findOne({
      "auth.accessToken": accessToken,
    });

    console.log("👤 USER FOUND:", Boolean(user));

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "کاربر پیدا نشد",
        },
        { status: 401 },
      );
    }

    const userId = user._id.toString();

    console.log("👤 USER ID:", userId);

    const query = {
      targetId: Number(targetId),
      targetType,
      userId,
    };

    console.log("🔎 FEEDBACK QUERY:", query);

    const existing = await FeedbackModel.findOne(query);

    console.log(
      "❤️ EXISTING FEEDBACK:",
      existing
        ? {
            id: existing._id.toString(),
            type: existing.type,
          }
        : null,
    );

    if (existing) {
      if (existing.type === type) {
        console.log("🗑️ DELETE FEEDBACK");

        await FeedbackModel.deleteOne({
          _id: existing._id,
        });
      } else {
        console.log("🔄 UPDATE FEEDBACK");

        existing.type = type;

        await existing.save();
      }
    } else {
      console.log("➕ CREATE FEEDBACK");

      await FeedbackModel.create({
        ...query,
        type,
      });
    }

    console.log("🟢 FEEDBACK SAVED");

    const [likes, dislikes] = await Promise.all([
      FeedbackModel.countDocuments({
        targetId: Number(targetId),
        targetType,
        type: "like",
      }),

      FeedbackModel.countDocuments({
        targetId: Number(targetId),
        targetType,
        type: "dislike",
      }),
    ]);

    const updated = await FeedbackModel.findOne(query);

    console.log("📊 COUNTS:", {
      likes,
      dislikes,
    });

    return Response.json({
      success: true,
      likes,
      dislikes,
      userLiked: updated?.type === "like",
      userDisliked: updated?.type === "dislike",
    });
  } catch (err) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ FEEDBACK PATCH ERROR");
    console.error("❌ NAME:", err.name);
    console.error("❌ MESSAGE:", err.message);
    console.error("❌ STACK:", err.stack);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    return Response.json(
      {
        success: false,
        message: err.message,
      },
      { status: 500 },
    );
  }
}
