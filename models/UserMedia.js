import mongoose from "mongoose";

const UserMediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["MAIN", "COMMENTS"], required: true },
    items: [
      {
        src: {
          imageSrc: String,
          imageWebpSrc: String,
          imageUrl: String,
        },
        type: { type: String, enum: ["image", "video"] },
        thumbnail: String,
        commentId: Number,
      },
    ],
    comment: { type: mongoose.Schema.Types.Mixed },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

const UserMedia =
  mongoose.models.UserMediaSchema ||
  mongoose.model("UserMedia", UserMediaSchema);

export default UserMedia;
