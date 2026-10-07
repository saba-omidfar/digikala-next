import mongoose from "mongoose";

const observeSchema = new mongoose.Schema(
  {
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
      enum: ["on_incredible_offer"],
      required: true,
    },

    send_sms: {
      type: Boolean,
      default: false,
    },

    send_email: {
      type: Boolean,
      default: false,
    },

    send_notification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

observeSchema.index(
  {
    userId: 1,
    productId: 1,
    type: 1,
  },
  {
    unique: true,
  },
);

const ObserveModel =
  mongoose.models.Observe || mongoose.model("Observe", observeSchema);

export default ObserveModel;
