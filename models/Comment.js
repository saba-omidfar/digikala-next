import mongoose from "mongoose";

import generate8DigitId from "@/utils/generate8DigitId";

const commentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },
  product_id: Number,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: { type: String, required: true },
  review_user_type: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "approved",
  },
  is_anonymous: {
    type: Boolean,
    default: false,
  },
  rate: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reactions: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },

    usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    usersDisliked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  title: String,
  is_buyer: { type: Number, default: 1 },
  user_name: String,
  social_profile: {
    username: {
      type: String,
      default: "",
    },
    photo: {
      type: String,
      default:
        "https://dkstatics-public.digikala.com/digikala-content-x-profile/730b1da13c1ab319e28246314a4e9ab67267826b_1737805761.png",
    },
    name: {
      type: String,
      default: "",
    },
    followings_count: { type: Number, default: 0 },
    followers_count: { type: Number, default: 0 },
    is_blocked: {
      type: Boolean,
      default: false,
    },
  },
  repeat_purchase_badge: {
    text: { type: String, default: "خریدار" },
    text_color: { type: String, default: "#424242" },
    bg_color: { type: String, default: "#fff" },
    tooltip_text: { type: String, default: "" },
  },
  purchased_item: {
    seller: {
      id: Number,
      title: String,
      company_name: { type: String, default: null },
      url: String,
      code: String,
      rate: Number,
      active: Boolean,
    },

    color: {
      id: Number,
      title: String,
      hex_code: String,
    },
  },
  relative_date: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.pre("save", async function (next) {
  if (!this.id) {
    let unique = false;
    let newId;

    while (!unique) {
      newId = generate8DigitId();
      const exists = await mongoose.models.Comment.findOne({ id: newId });
      if (!exists) unique = true;
    }

    this.id = newId;
  }

  next();
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
