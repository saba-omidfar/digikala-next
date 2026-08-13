// import mongoose from "mongoose";

// const PriceFeedbackSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: String,
//       required: true,
//     },

//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// PriceFeedbackSchema.index({ productId: 1, userId: 1 }, { unique: true });

// export default mongoose.models.PriceFeedback ||
//   mongoose.model("PriceFeedback", PriceFeedbackSchema);

import mongoose from "mongoose";

const PriceFeedbackSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    competitorPrice: {
      type: Number,
      required: true,
    },

    isOnlineStore: {
      type: Boolean,
      required: true,
    },

    onlineStoreUrl: {
      type: String,
      default: "",
      trim: true,
    },

    physicalStoreName: {
      type: String,
      default: "",
      trim: true,
    },

    physicalStoreStateId: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

PriceFeedbackSchema.index(
  {
    productId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.models.PriceFeedback ||
  mongoose.model("PriceFeedback", PriceFeedbackSchema);
