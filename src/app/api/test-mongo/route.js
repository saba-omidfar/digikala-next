import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  });

  try {
    console.log("🟡 RAW MONGO CONNECT");

    await client.connect();

    console.log("🟢 RAW MONGO CONNECTED");

    const result = await client.db("admin").command({
      ping: 1,
    });

    console.log("🏓 PING:", result);

    return Response.json({
      success: true,
      ping: result,
    });
  } catch (error) {
    console.error("❌ RAW MONGO ERROR:", error);

    return Response.json(
      {
        success: false,
        name: error.name,
        message: error.message,
        code: error.code || null,
        reason: error.reason?.message || null,
      },
      { status: 500 },
    );
  } finally {
    await client.close().catch(() => {});
  }
}
