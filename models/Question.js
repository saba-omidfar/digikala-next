import mongoose from "mongoose";

import generate8DigitId from "@/utils/generate8DigitId";

const answerSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  sender: {
    type: String,
    required: true,
  },
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
  type: {
    type: String,
    enum: ["buyer", "seller", "admin", "user"],
    default: "user",
  },
  reactions: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },
  source: {
    type: String,
    enum: ["digikala", "local"],
    required: true,
  },
  productId: Number,
  text: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "accepted",
  },
  answerCount: { type: Number, default: 0 },
  sender: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
  answers: [answerSchema],
});

questionSchema.pre("save", async function (next) {
  if (!this.id) {
    let unique = false;
    let newId;

    while (!unique) {
      newId = generate8DigitId();
      const exists = await mongoose.models.Question.findOne({ id: newId });
      if (!exists) unique = true;
    }

    this.id = newId;
  }

  next();
});

answerSchema.pre("save", async function (next) {
  if (!this.id) {
    let unique = false;
    let newId;

    while (!unique) {
      newId = generate8DigitId();
      const exists = await mongoose.models.Question.findOne({ id: newId });
      if (!exists) unique = true;
    }

    this.id = newId;
  }

  next();
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
