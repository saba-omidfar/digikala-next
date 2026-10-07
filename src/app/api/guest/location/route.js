import dbConnect from "@/configs/db";
import GuestLocationModel from "@/models/GuestLocation";

export async function POST(req) {
  try {
    await dbConnect();

    const { guestCartId, address } = await req.json();

    if (!guestCartId) {
      return Response.json(
        {
          success: false,
          message: "guestCartId الزامی است",
        },
        { status: 400 },
      );
    }

    const guestLocation = await GuestLocationModel.findOneAndUpdate(
      { guestCartId },
      {
        guestCartId,
        default_address: address,
      },
      {
        new: true,
        upsert: true,
      },
    );

    return Response.json(
      {
        success: true,
        data: guestLocation,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GUEST LOCATION ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
