import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import dbConnect from "@/configs/db";

import UserModel from "@/models/User";
import CartModel from "@/models/Cart";
import WishlistModel from "@/models/Wishlist";
import OrderModel from "@/models/Order";
import CommentModel from "@/models/Comment";
import CommentReportModel from "@/models/CommentReport";
import FeedbackModel from "@/models/Feedbacks";
import NotificationModel from "@/models/Notification";
import ObserveModel from "@/models/Observe";
import PriceFeedbackModel from "@/models/PriceFeedback";
import ProductFeedbackModel from "@/models/ProductFeedback";
import QuestionModel from "@/models/Question";
import UserMediaModel from "@/models/UserMedia";
import EmailVerificationCodeModel from "@/models/EmailVerificationCode";
import OTPModel from "@/models/Otp";

export async function DELETE() {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "کاربر وارد نشده است" },
        { status: 401 },
      );
    }

    const currentUser = await UserModel.findOne({
      "auth.accessToken": token,
    }).select("_id");

    console.log("currentUser=>", currentUser);

    if (!currentUser) {
      return NextResponse.json({ message: "کاربر پیدا نشد" }, { status: 404 });
    }

    const userId = currentUser._id;

    const userComments = await CommentModel.find({
      user_id: userId,
    }).select("id");

    const commentIds = userComments
      .map((comment) => comment.id)
      .filter(Boolean);

    const userQuestions = await QuestionModel.find({
      user_id: userId,
    }).select("id answers");

    const userQuestionIds = userQuestions
      .map((question) => question.id)
      .filter(Boolean);

    const userAnswerIds = [];

    const questionsWithUserAnswers = await QuestionModel.find({
      "answers.user_id": userId,
    }).select("answers.id");

    questionsWithUserAnswers.forEach((question) => {
      question.answers?.forEach((answer) => {
        if (String(answer.user_id) === String(userId) && answer.id) {
          userAnswerIds.push(answer.id);
        }
      });
    });

    userQuestions.forEach((question) => {
      question.answers?.forEach((answer) => {
        if (String(answer.user_id) === String(userId) && answer.id) {
          userAnswerIds.push(answer.id);
        }
      });
    });

    const uniqueAnswerIds = [...new Set(userAnswerIds)];

    await CartModel.deleteMany({
      userId,
    });

    await WishlistModel.deleteMany({
      userId,
    });

    await OrderModel.deleteMany({
      userId,
    });

    await NotificationModel.deleteMany({
      user_id: userId,
    });

    await ObserveModel.deleteMany({
      userId,
    });

    await PriceFeedbackModel.deleteMany({
      userId,
    });

    await ProductFeedbackModel.deleteMany({
      userId,
    });

    await CommentReportModel.deleteMany({
      userId,
    });

    if (commentIds.length) {
      await CommentReportModel.deleteMany({
        commentId: {
          $in: commentIds.map(String),
        },
      });
    }

    await FeedbackModel.deleteMany({
      userId,
    });

    if (uniqueAnswerIds.length) {
      await FeedbackModel.deleteMany({
        targetType: "answer",
        targetId: {
          $in: uniqueAnswerIds,
        },
      });
    }

    if (commentIds.length) {
      await FeedbackModel.deleteMany({
        targetType: "comment",
        targetId: {
          $in: commentIds,
        },
      });
    }

    await CommentModel.updateMany(
      {},
      {
        $pull: {
          "reactions.usersLiked": userId,
          "reactions.usersDisliked": userId,
        },
      },
    );

    await CommentModel.deleteMany({
      user_id: userId,
    });

    await QuestionModel.deleteMany({
      user_id: userId,
    });

    await QuestionModel.updateMany(
      {
        "answers.user_id": userId,
      },
      {
        $pull: {
          answers: {
            user_id: userId,
          },
        },
      },
    );

    if (commentIds.length) {
      await UserMediaModel.deleteMany({
        commentId: {
          $in: commentIds,
        },
      });
    }

    await EmailVerificationCodeModel.deleteMany({
      user_id: userId,
    });

    await OTPModel.deleteMany({
      userId,
    });

    await UserModel.deleteOne({
      _id: userId,
    });

    const response = NextResponse.json({
      success: true,
      message: "حساب کاربری با موفقیت حذف شد",
    });

    response.cookies.delete("access_token");

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "خطا در حذف حساب کاربری",
      },
      { status: 500 },
    );
  }
}
