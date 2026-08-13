// https://api.digikala.com/v1/brands/tch/premium/

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { brandCode } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/brands/${brandCode}/premium/?${searchParams.toString()}`;

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
