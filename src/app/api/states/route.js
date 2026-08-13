import dbConnect from "@/configs/db";
import StateModel from "@/models/State";

export async function GET() {
  try {
    await dbConnect();

    const states = await StateModel.find({}, { _id: 0, __v: 0 });

    return new Response(JSON.stringify({ data: states }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
