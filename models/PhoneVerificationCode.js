import mongoose from "mongoose";

const PhoneVerificationCodeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
    },

    expires_at: {
      type: Date,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

PhoneVerificationCodeSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.PhoneVerificationCode ||
  mongoose.model("PhoneVerificationCode", PhoneVerificationCodeSchema);
