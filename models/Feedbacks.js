import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    targetId: {
      type: Number,
      required: true,
      index: true,
    },
    targetType: {
      type: String,
      enum: ["comment", "answer", "ai_summary"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  { timestamps: true }
);

FeedbackSchema.index(
  { targetId: 1, targetType: 1, userId: 1 },
  { unique: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
