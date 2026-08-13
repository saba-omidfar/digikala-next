// https://api.digikala.com/v2/autocomplete/?q=سا

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "";

    const path = `/v2/autocomplete/?q=${query}`;

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
