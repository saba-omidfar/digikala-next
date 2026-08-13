import mongoose from "mongoose";

const ColorPaletteSchema = new mongoose.Schema(
  {
    filterOptionId: {
      type: Number,
      required: true,
      unique: true,
    },
    filterOptionHexCode: {
      type: String,
      required: true,
    },
    filterOptionTitle: {
      type: String,
      required: true,
    },
    filterOptionDescription: {
      type: String,
      default: "",
    },

    filterOptionImage: {
      imageSrc: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
    },

    filterOptionTitleFa: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ColorPalette =
  mongoose.models.ColorPalette ||
  mongoose.model("ColorPalette", ColorPaletteSchema);

export default ColorPalette;
