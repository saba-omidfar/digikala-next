import mongoose from "mongoose";

const guestLocationSchema = new mongoose.Schema(
  {
    guestCartId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    default_address: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.GuestLocation ||
  mongoose.model("GuestLocation", guestLocationSchema);
