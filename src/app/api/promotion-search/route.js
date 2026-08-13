// https://api.digikala.com/v1/promotion-search/?page=1&promotion_types%5B0%5D=incredible_offer&promotion_types%5B1%5D=promotion

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const path = `/v1/promotion-search/?${searchParams?.toString()}`;

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
