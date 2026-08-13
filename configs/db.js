import mongoose from "mongoose";

const connectedToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected 😍");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
  }
};

export default connectedToDB;
