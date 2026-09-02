import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    console.log("🔵 MONGO STATE:", mongoose.connection.readyState);

    if (mongoose.connection.readyState === 1) {
      console.log("🟢 MONGO ALREADY CONNECTED");
      return;
    }

    console.log("🟡 MONGO CONNECTING...");

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });

    console.log("🟢 MONGO CONNECTED:", mongoose.connection.readyState);
  } catch (error) {
    console.error("❌ MONGO ERROR:", error);
    console.error("❌ MONGO ERROR MESSAGE:", error.message);

    throw error;
  }
};

export default dbConnect;
