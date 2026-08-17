// https://api.digikala.com/fresh/v1/autocomplete/?_whid=1&utm_source=digikala-web&utm_medium=home-category&q=%D8%B3%D8%A8

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "";

    const path = `/fresh/v1/autocomplete/?_whid=1&utm_source=digikala-web&utm_medium=home-category&q=${query}`;

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
