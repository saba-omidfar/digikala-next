import mongoose from "mongoose";

export async function POST() {
  try {
    const guestId = new mongoose.Types.ObjectId().toString();

    return Response.json(
      {
        success: true,
        guestCartId: guestId,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
