import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    blockedUntil: { type: Date, default: null },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const OTPModel = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
export default OTPModel;
