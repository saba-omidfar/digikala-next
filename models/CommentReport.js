// models/CommentReport.js

import mongoose from "mongoose";

const CommentReportSchema = new mongoose.Schema(
  {
    commentId: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CommentReportSchema.index({ commentId: 1, userId: 1 }, { unique: true });

export default mongoose.models.CommentReport ||
  mongoose.model("CommentReport", CommentReportSchema);
