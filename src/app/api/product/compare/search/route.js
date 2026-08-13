// https://api.digikala.com/v1/product/compare/search/?page=1&product_ids%5B0%5D=20481188&q=

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();

    const path = `/v1/product/compare/search/?${queryString}`;

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
