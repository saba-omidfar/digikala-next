import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { widgetId } = await params;

    const path = `/discovery/api/v1/widget-factory/widget/${widgetId}`;

    const data = await digikalaFetch({
      path,
    });

    return Response.json(data);
  } catch (err) {
    console.error("Widget API Error =>", err);

    return Response.json(
      {
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
