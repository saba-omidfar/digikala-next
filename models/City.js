import mongoose from "mongoose";

const CitySchema = new mongoose.Schema(
  {
    city_id: { type: Number, required: true, unique: true },
    state_id: { type: Number, required: true },
    city_name: { type: String, required: true },
    city_title: { type: String, required: true },
    state: {
      state_id: { type: Number },
      state_title: { type: String },
    },
  },
  { timestamps: true },
);

const CityModel = mongoose.models.City || mongoose.model("City", CitySchema);
export default CityModel;
