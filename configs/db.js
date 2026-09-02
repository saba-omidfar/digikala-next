import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    console.log("🔵 MONGO READY STATE BEFORE:", mongoose.connection.readyState);

    if (mongoose.connection.readyState === 1) {
      console.log("🟢 MONGO ALREADY CONNECTED");
      return;
    }

    console.log("🟡 MONGO CONNECTING...");

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log("🟢 MONGO CONNECTED:", mongoose.connection.readyState);
  } catch (error) {
    console.error("❌ MONGO CONNECT ERROR:", error.message);
    console.error("❌ MONGO READY STATE:", mongoose.connection.readyState);

    throw error;
  }
};

export default dbConnect;
