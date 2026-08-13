import mongoose from "mongoose";

const AmazingNotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  productId: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    required: true,
    enum: ["on_incredible_offer", "available", "price_drop"],
  },

  send_email: {
    type: Boolean,
    default: false,
  },

  send_sms: {
    type: Boolean,
    default: false,
  },

  send_notification: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.AmazingNotification ||
  mongoose.model("AmazingNotification", AmazingNotificationSchema);
