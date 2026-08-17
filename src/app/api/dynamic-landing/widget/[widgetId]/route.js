import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  const { widgetId } = await params;

  try {
    const path = `/v1/dynamic-landing/widget/${widgetId}/`;

    const data = await digikalaFetch({
      path,

      nextRevalidateSeconds: 60,
    });

    return Response.json(data);
  } catch (err) {
    console.error(err);

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
