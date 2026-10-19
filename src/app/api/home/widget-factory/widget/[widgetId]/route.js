import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  try {
    const { widgetId } = await params;

    if (!widgetId) {
      return Response.json(
        { message: "Widget ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();

    const path = `/discovery/api/v1/widget-factory/widget/${widgetId}${
      queryString ? `?${queryString}` : ""
    }`;

    const data = await digikalaFetch({ path });

    return Response.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Widget API Error =>", err);

    return Response.json(
      {
        message: err.message || "Failed to fetch widget data",
      },
      { status: 500 },
    );
  }
}
