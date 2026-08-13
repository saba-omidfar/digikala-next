// https://api.digikala.com/discovery/api/v1/brands/tch/products?_rch=9fd46e644c8e&no_redirect=1&page=1

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { brandCode } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/discovery/api/v1/brands/${brandCode}/products/?${searchParams.toString()}`;

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
