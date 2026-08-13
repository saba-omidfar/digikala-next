// https://www.digikala.com/fresh/search/?has_selling_stock=1

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/fresh/v1/search/?_whid=29&${searchParams.toString()}`;

    const data = await digikalaFetch({
      path,
      headers: req.headers,
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
