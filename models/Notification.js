import mongoose from "mongoose";

import generate8DigitId from "@/utils/generate8DigitId";

const notificationSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      index: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    main_image: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      default: [],
    },

    url: {
      base: {
        type: String,
        default: null,
      },
      uri: {
        type: String,
        default: "",
      },
    },

    tab_type: {
      type: String,
      enum: ["alert", "order", "system", "promotion"],
      default: "alert",
    },

    type: {
      type: String,
      default: "inform",
    },

    status: {
      type: String,
      enum: ["seen", "unseen"],
      default: "unseen",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    action_title: {
      type: String,
      default: "",
    },

    icon: {
      image: {
        type: String,
        default: "",
      },
    },

    is_expired: {
      type: Boolean,
      default: false,
    },

    expiration_text: {
      type: String,
      default: "این پیام منقضی شده است.",
    },

    action: {
      type: Array,
      default: [],
    },

    provider_click_url: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.pre("save", async function (next) {
  if (!this.id) {
    let unique = false;
    let newId;

    while (!unique) {
      newId = generate8DigitId();

      const exists = await mongoose.models.Notification.findOne({
        id: newId,
      });

      if (!exists) {
        unique = true;
      }
    }

    this.id = newId;
  }

  next();
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
