// https://api.digikala.com/v1/product/compare/?product_ids%5B0%5D=20481188&product_ids%5B1%5D=20127115

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();

    const path = `/v1/product/compare/?${queryString}`;

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
