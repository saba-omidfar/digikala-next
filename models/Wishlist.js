import mongoose from "mongoose";

const wishListImageSchema = new mongoose.Schema(
  {
    storage_ids: {
      type: [String],
      default: [],
    },

    url: {
      type: [String],
      default: [],
    },

    thumbnail_url: {
      type: String,
      default: null,
    },

    temporary_id: {
      type: String,
      default: null,
    },

    webp_url: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

const wishListItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    code: {
      type: String,
      unique: true,
      required: true,
    },

    color_or_size: {
      type: String,
      default: "",
    },

    product_on_list: {
      type: Boolean,
      default: false,
    },

    product_images: {
      type: [wishListImageSchema],
      default: [],
    },

    item_product: {
      type: [wishListItemSchema],
      default: [],
    },

    size: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

wishListSchema.pre("save", function (next) {
  this.size = this.item_product.length;
  next();
});

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", wishListSchema);
