import mongoose from "mongoose";

mongoose.connection.on("connected", () => {
  console.log("🟢 MONGO EVENT: connected");
});

mongoose.connection.on("open", () => {
  console.log("🟢 MONGO EVENT: open");
});

mongoose.connection.on("disconnected", () => {
  console.log("🔴 MONGO EVENT: disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("🔴 MONGO EVENT: error:", error.message);
});

const globalMongoose = globalThis;

const dbConnect = async () => {
  try {
    const state = mongoose.connection.readyState;

    console.log("🔵 MONGO READY STATE:", state);

    // 1 = connected
    if (state === 1) {
      console.log("🟢 MONGO ALREADY CONNECTED");
      return mongoose.connection;
    }

    // 2 = connecting
    // اگر قبلاً connection در حال برقراری است،
    // دوباره mongoose.connect() نزن.
    if (state === 2) {
      console.log("🟡 MONGO ALREADY CONNECTING → WAIT");

      await mongoose.connection.asPromise();

      console.log(
        "🟢 MONGO CONNECTION FINISHED:",
        mongoose.connection.readyState,
      );

      return mongoose.connection;
    }

    console.log("🟡 MONGO START CONNECT");

    if (!globalMongoose.__mongoConnectPromise) {
      globalMongoose.__mongoConnectPromise = mongoose.connect(
        process.env.MONGODB_URI,
        {
          serverSelectionTimeoutMS: 10000,
          connectTimeoutMS: 10000,
        },
      );
    }

    await globalMongoose.__mongoConnectPromise;

    console.log("🟢 MONGO CONNECTED:", mongoose.connection.readyState);

    return mongoose.connection;
  } catch (error) {
    console.error("❌ MONGO CONNECT ERROR:", error.message);
    console.error("❌ MONGO READY STATE:", mongoose.connection.readyState);

    globalMongoose.__mongoConnectPromise = null;

    throw error;
  }
};

export default dbConnect;
