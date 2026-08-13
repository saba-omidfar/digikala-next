// https://api.digikala.com/v1/promotions/plp_321503903/?camCode=2194&page=1&sort=26

import { digikalaFetch } from "@/lib/digikala";
export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    const { promotionId } = await params;

    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // const camCode = req.nextUrl.searchParams.get("camCode");
    // const page = req.nextUrl.searchParams.get("page") || 1;
    // const sort = req.nextUrl.searchParams.get("sort") || 26;

    const path = `/v1/promotions/${promotionId}/?${searchParams?.toString()}`;

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
