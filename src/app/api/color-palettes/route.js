import dbConnect from "@/configs/db";
import ColorPalette from "@/models/ColorPalette";

export async function GET() {
  try {
    await dbConnect();

    const palettes = await ColorPalette.find().lean();

    return new Response(
      JSON.stringify({
        message: "color palettes fetched successfully",
        data: palettes,
      }),
      { status: 200 },
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
