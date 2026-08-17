// https://api.digikala.com/v1/best-selling/?last_days=week

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/best-selling/?${searchParams.toString()}`;

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
