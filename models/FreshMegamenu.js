import mongoose from "mongoose";

const categoryChildSchema = new mongoose.Schema({
  categoryId: { type: Number, required: true },
  categoryTitle: { type: String, required: true },
  categoryUrl: { type: String, required: true },
  categoryBanner: { type: Object, default: {} },
  categoryBadge: { type: Object, default: {} },
  categoryImage: { type: Object, default: {} },
  columnNumber: { type: Number, default: 0 },
  rowNumber: { type: Number, default: 0 },
  categoryPLPUrl: { type: String, default: null },
  categoryChildren: { type: [mongoose.Schema.Types.Mixed], default: [] },
});

const megamenuCategorySchema = new mongoose.Schema(
  {
    categoryId: { type: Number, required: true },
    categoryTitle: { type: String, required: true },
    categoryIcon: { type: String, default: null },
    categoryUrl: { type: String, required: true },
    categoryChildren: {
      type: Map,
      of: [categoryChildSchema],
      default: {},
    },
    subCategoriesBestSelling: {
      type: [
        {
          categoryImage: {},
          categoryLogo: {},
          categoryIcon: {},
          categoryProductImage: {
            imageSrc: String,
            imageUrl: String,
          },
          categoryTopProductImage: String,
          categoryProductsCount: Number,
          categoryCode: String,
          categoryId: Number,
          categoryTitle: String,
          categoryTitleEn: String,
          categoryTitleFa: String,
          categoryUrl: String,
        },
      ],
      default: [],
    },
    categoryBanner: { type: Object, default: {} },
    categoryBadge: { type: Object, default: {} },
    categoryImage: { type: Object, default: {} },
    columnNumber: { type: Number, default: 0 },
    rowNumber: { type: Number, default: 0 },
    categoryPLPUrl: { type: String, default: null },
  },
  { timestamps: true },
);

const FreshMegamenuModel =
  mongoose.models.FreshMegamenu ||
  mongoose.model("FreshMegamenu", megamenuCategorySchema);

export default FreshMegamenuModel;
