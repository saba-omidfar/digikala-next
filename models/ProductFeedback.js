import mongoose from "mongoose";

const ProductFeedbackSchema = new mongoose.Schema(
  {
    productId: {
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

ProductFeedbackSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.models.ProductFeedback ||
  mongoose.model("ProductFeedback", ProductFeedbackSchema);
