// https://api.digikala.com/v1/map/reverse-geo/?latitude=36.830961&longitude=54.448008

import { digikalaFetch } from "@/lib/digikala";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/map/reverse-geo/?${searchParams.toString()}`;

    const data = await digikalaFetch({
      path,
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
