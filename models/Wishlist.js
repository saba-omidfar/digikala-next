// import mongoose from "mongoose";

// const wishListImageSchema = new mongoose.Schema({
//   imageSrc: { type: String, required: true },
//   imageUrl: { type: String, required: true },
// });

// const wishListSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//     code: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     color_or_size: {
//       type: String,
//       default: "",
//     },
//     product_on_list: {
//       type: Boolean,
//       default: false,
//     },
//     product_images: [wishListImageSchema],
//     item_product: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//     ],
//     size: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Wishlist ||
//   mongoose.model("Wishlist", wishListSchema);

import mongoose from "mongoose";

const wishListImageSchema = new mongoose.Schema({
  imageSrc: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

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

    product_images: [wishListImageSchema],

    // ✅ Hybrid products
    item_product: [wishListItemSchema],

    size: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// 🧠 اتوماتیک size
wishListSchema.pre("save", function (next) {
  this.size = this.item_product.length;
  next();
});

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", wishListSchema);
