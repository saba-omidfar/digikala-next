import dbConnect from "@/configs/db";
import FreshMegamenuModel from "@/models/FreshMegamenu";

export async function GET() {
  try {
    await dbConnect();

    const megamenus = await FreshMegamenuModel.find().lean();

    return new Response(
      JSON.stringify({
        message: "Megamenus fetched successfully.",
        data: megamenus,
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
