import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const dbConnect = async () => {
  // قبلاً وصل شده
  if (cached.conn) {
    console.log("🟢 MONGO CACHED CONNECTION");
    return cached.conn;
  }

  // اتصال قبلی در حال انجام است
  if (!cached.promise) {
    console.log("🟡 MONGO START CONNECT");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
      })
      .then((mongoose) => {
        console.log("🟢 MONGO CONNECTED:", mongoose.connection.readyState);

        return mongoose;
      })
      .catch((error) => {
        console.error("❌ MONGO CONNECTION ERROR:", error.message);

        cached.promise = null;

        throw error;
      });
  } else {
    console.log("🟡 MONGO WAIT EXISTING CONNECTION");
  }

  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnect;
